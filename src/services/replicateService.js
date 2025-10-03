/**
 * Сервис для работы с Replicate API через backend прокси
 */

// URL вашего backend прокси-сервера
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
        num_inference_steps: 25, // ⚡ Уменьшил с 30 до 25 для ускорения
        guidance_scale: 7.5,
        seed: seed || Math.floor(Math.random() * 1000000)
      }
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || error.error || 'Ошибка создания предсказания');
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
    throw new Error(error.error || 'Ошибка получения статуса');
  }

  return await response.json();
}

/**
 * Ждет завершения предсказания
 */
export async function waitForPrediction(apiKey, predictionId, onProgress = null) {
  let attempts = 0;
  const maxAttempts = 90; // Увеличил до 90 секунд на всякий случай
  
  while (attempts < maxAttempts) {
    const prediction = await getPrediction(apiKey, predictionId);
    
    if (onProgress) {
      onProgress(prediction);
    }
    
    if (prediction.status === 'succeeded') {
      return prediction;
    }
    
    if (prediction.status === 'failed') {
      throw new Error(prediction.error || 'Генерация не удалась');
    }
    
    if (prediction.status === 'canceled') {
      throw new Error('Генерация была отменена');
    }
    
    // Ждем 1 секунду перед следующей проверкой
    await new Promise(resolve => setTimeout(resolve, 1000));
    attempts++;
  }
  
  throw new Error('Превышено время ожидания');
}

/**
 * ⚡ ОПТИМИЗИРОВАННАЯ генерация нескольких вариантов дизайна
 * Создаёт ВСЕ запросы параллельно, затем ждёт результаты
 */
export async function generateDesigns(apiKey, prompt, numberOfVariants = 4) {
  console.log(`🚀 Запуск параллельной генерации ${numberOfVariants} вариантов...`);
  
  // ⚡ ПАРАЛЛЕЛЬНО создаём ВСЕ предсказания СРАЗУ
  const predictionPromises = Array.from({ length: numberOfVariants }, (_, i) => {
    console.log(`📤 Отправка запроса ${i + 1}/${numberOfVariants}`);
    return createPrediction(apiKey, prompt);
  });
  
  // Ждём создания ВСЕХ предсказаний
  const predictions = await Promise.all(predictionPromises);
  console.log(`✅ Все ${numberOfVariants} запроса созданы, ожидание генерации...`);
  
  // Теперь параллельно ждём завершения ВСЕХ генераций
  const results = await Promise.all(
    predictions.map((pred, index) => {
      console.log(`⏳ Ожидание результата ${index + 1}/${numberOfVariants} (ID: ${pred.id})`);
      return waitForPrediction(apiKey, pred.id, (status) => {
        console.log(`📊 Изображение ${index + 1}: статус ${status.status}`);
      });
    })
  );
  
  console.log(`🎉 Все ${numberOfVariants} изображения готовы!`);
  
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
}

/**
 * Улучшает промт для создания бесшовных паттернов
 */
function enhancePromptForSeamless(prompt) {
  const seamlessKeywords = [
    'seamless pattern',
    'tileable',
    'repeating pattern',
    'high quality',
    'detailed',
    'professional design for textile printing',
    'vibrant colors'
  ];
  
  // Проверяем, есть ли уже ключевые слова
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
