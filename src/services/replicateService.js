/**
 * Сервис для работы с Replicate API через backend прокси
 */

const PROXY_API_URL = process.env.REACT_APP_PROXY_URL || 'http://localhost:3001/api';
const SDXL_MODEL_VERSION = '39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b';

/**
 * Создает предсказание (запускает генерацию изображения)
 */
export async function createPrediction(apiKey, prompt, seed = null) {
  const enhancedPrompt = enhancePromptForSeamless(prompt);
  
  const response = await fetch(`${PROXY_API_URL}/predictions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      apiKey: apiKey,
      version: SDXL_MODEL_VERSION,
      input: {
        prompt: enhancedPrompt,
        negative_prompt: "blurry, low quality, distorted, ugly, watermark, text, signature, logo, letters, words",
        width: 1024,
        height: 1024,
        num_outputs: 1,
        scheduler: "K_EULER",
        num_inference_steps: 25,
        guidance_scale: 7.5,
        seed: seed || Math.floor(Math.random() * 1000000)
      }
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || error.error || 'Не удалось создать запрос');
  }

  return await response.json();
}

/**
 * Получает статус предсказания
 */
export async function getPrediction(apiKey, predictionId) {
  const response = await fetch(`${PROXY_API_URL}/predictions/${predictionId}`, {
    headers: {
      'X-API-Key': apiKey,
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Не удалось получить статус');
  }

  return await response.json();
}

/**
 * Ждет завершения предсказания с подробным отслеживанием прогресса
 */
export async function waitForPrediction(apiKey, predictionId, onProgress = null) {
  let attempts = 0;
  const maxAttempts = 90;
  
  while (attempts < maxAttempts) {
    const prediction = await getPrediction(apiKey, predictionId);
    
    // Определяем детальный статус
    let detailedStatus = {
      status: prediction.status,
      stage: 'unknown',
      message: ''
    };

    if (prediction.status === 'starting') {
      detailedStatus.stage = 'starting';
      detailedStatus.message = 'Инициализация...';
    } else if (prediction.status === 'processing') {
      detailedStatus.stage = 'generating';
      detailedStatus.message = 'Генерация изображения...';
    } else if (prediction.status === 'succeeded') {
      detailedStatus.stage = 'loading';
      detailedStatus.message = 'Загрузка изображения...';
    }
    
    if (onProgress) {
      onProgress(detailedStatus);
    }
    
    if (prediction.status === 'succeeded') {
      return prediction;
    }
    
    if (prediction.status === 'failed') {
      throw new Error(prediction.error || 'Ошибка генерации');
    }
    
    if (prediction.status === 'canceled') {
      throw new Error('Генерация отменена');
    }
    
    // Ждем 1 секунду перед следующей проверкой
    await new Promise(resolve => setTimeout(resolve, 1000));
    attempts++;
  }
  
  throw new Error('Превышено время ожидания');
}

/**
 * Оптимизированная параллельная генерация нескольких вариантов дизайна
 * Создает ВСЕ запросы параллельно, затем ждет результаты
 */
export async function generateDesigns(apiKey, prompt, numberOfVariants = 4, onProgressUpdate = null) {
  console.log(`Запуск параллельной генерации ${numberOfVariants} вариантов...`);
  
  // Инициализация массива статусов для каждого изображения
  const imageStatuses = Array.from({ length: numberOfVariants }, (_, i) => ({
    index: i,
    stage: 'creating',
    message: 'Создание запроса...',
    status: 'starting'
  }));
  
  const updateProgress = () => {
    if (onProgressUpdate) {
      onProgressUpdate([...imageStatuses]);
    }
  };
  
  try {
    // Создаем ВСЕ предсказания параллельно
    updateProgress();
    
    const predictionPromises = Array.from({ length: numberOfVariants }, async (_, i) => {
      console.log(`Отправка запроса ${i + 1}/${numberOfVariants}`);
      imageStatuses[i] = {
        index: i,
        stage: 'creating',
        message: 'Отправка запроса...',
        status: 'starting'
      };
      updateProgress();
      
      try {
        const prediction = await createPrediction(apiKey, prompt);
        imageStatuses[i] = {
          index: i,
          stage: 'waiting',
          message: 'Запрос создан, ожидание генерации...',
          status: 'processing',
          predictionId: prediction.id
        };
        updateProgress();
        return prediction;
      } catch (error) {
        imageStatuses[i] = {
          index: i,
          stage: 'error',
          message: `Ошибка: ${error.message}`,
          status: 'failed'
        };
        updateProgress();
        throw error;
      }
    });
    
    // Ждем создания ВСЕХ предсказаний
    const predictions = await Promise.all(predictionPromises);
    console.log(`Все ${numberOfVariants} запросы созданы, ожидание генерации...`);
    
    // Теперь ждем завершения ВСЕХ генераций параллельно
    const results = await Promise.all(
      predictions.map((pred, index) => {
        console.log(`Ожидание результата ${index + 1}/${numberOfVariants} (ID: ${pred.id})`);
        
        return waitForPrediction(apiKey, pred.id, (detailedStatus) => {
          imageStatuses[index] = {
            index: index,
            stage: detailedStatus.stage,
            message: detailedStatus.message,
            status: detailedStatus.status,
            predictionId: pred.id
          };
          updateProgress();
          console.log(`Изображение ${index + 1}: ${detailedStatus.message}`);
        });
      })
    );
    
    console.log(`Все ${numberOfVariants} изображения готовы!`);
    
    // Обновляем статусы на "завершено"
    imageStatuses.forEach((status, i) => {
      imageStatuses[i] = {
        ...status,
        stage: 'completed',
        message: 'Готово!',
        status: 'succeeded'
      };
    });
    updateProgress();
    
    // Извлекаем URL изображений
    return results
      .filter(result => result.output && result.output[0])
      .map((result, index) => ({
        id: result.id,
        url: result.output[0],
        prompt: prompt,
        seed: result.input?.seed,
        index: index
      }));
  } catch (error) {
    console.error('Ошибка генерации:', error);
    throw error;
  }
}

/**
 * Улучшает промт для создания бесшовного паттерна
 */
function enhancePromptForSeamless(prompt) {
  const seamlessKeywords = [
    'seamless pattern',
    'tileable',
    'repeating pattern',
    'бесшовный',
    'паттерн'
  ];
  
  // Проверяем, есть ли уже ключевые слова для бесшовности
  const hasSeamless = seamlessKeywords.some(keyword => 
    prompt.toLowerCase().includes(keyword.toLowerCase())
  );
  
  if (hasSeamless) {
    return prompt;
  }
  
  return `${prompt}, seamless pattern, tileable, high quality, detailed, professional design for textile printing`;
}

/**
 * Валидация API ключа
 */
export function validateApiKey(apiKey) {
  if (!apiKey || apiKey.trim() === '') {
    return { valid: false, error: 'API ключ не может быть пустым' };
  }
  
  if (!apiKey.startsWith('r8_')) {
    return { valid: false, error: 'API ключ должен начинаться с r8_' };
  }
  
  if (apiKey.length < 40) {
    return { valid: false, error: 'API ключ слишком короткий' };
  }
  
  return { valid: true };
}
