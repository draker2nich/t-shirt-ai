/**
 * Service for working with Replicate API through backend proxy
 */

const PROXY_API_URL = process.env.REACT_APP_PROXY_URL || 'http://localhost:3001/api';
const SDXL_MODEL_VERSION = '39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b';

/**
 * Creates a prediction (starts image generation)
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
    throw new Error(error.detail || error.error || 'Failed to create prediction');
  }

  return await response.json();
}

/**
 * Gets prediction status
 */
export async function getPrediction(apiKey, predictionId) {
  const response = await fetch(`${PROXY_API_URL}/predictions/${predictionId}`, {
    headers: {
      'X-API-Key': apiKey,
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get prediction status');
  }

  return await response.json();
}

/**
 * Waits for prediction completion
 */
export async function waitForPrediction(apiKey, predictionId, onProgress = null) {
  let attempts = 0;
  const maxAttempts = 90;
  
  while (attempts < maxAttempts) {
    const prediction = await getPrediction(apiKey, predictionId);
    
    if (onProgress) {
      onProgress(prediction);
    }
    
    if (prediction.status === 'succeeded') {
      return prediction;
    }
    
    if (prediction.status === 'failed') {
      throw new Error(prediction.error || 'Generation failed');
    }
    
    if (prediction.status === 'canceled') {
      throw new Error('Generation was canceled');
    }
    
    // Wait 1 second before next check
    await new Promise(resolve => setTimeout(resolve, 1000));
    attempts++;
  }
  
  throw new Error('Request timeout exceeded');
}

/**
 * Optimized parallel generation of multiple design variants
 * Creates ALL requests in parallel, then waits for results
 */
export async function generateDesigns(apiKey, prompt, numberOfVariants = 4) {
  console.log(`Starting parallel generation of ${numberOfVariants} variants...`);
  
  // Create ALL predictions in parallel
  const predictionPromises = Array.from({ length: numberOfVariants }, (_, i) => {
    console.log(`Sending request ${i + 1}/${numberOfVariants}`);
    return createPrediction(apiKey, prompt);
  });
  
  // Wait for ALL predictions to be created
  const predictions = await Promise.all(predictionPromises);
  console.log(`All ${numberOfVariants} requests created, waiting for generation...`);
  
  // Now wait for ALL generations to complete in parallel
  const results = await Promise.all(
    predictions.map((pred, index) => {
      console.log(`Waiting for result ${index + 1}/${numberOfVariants} (ID: ${pred.id})`);
      return waitForPrediction(apiKey, pred.id, (status) => {
        console.log(`Image ${index + 1}: status ${status.status}`);
      });
    })
  );
  
  console.log(`All ${numberOfVariants} images ready!`);
  
  // Extract image URLs
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
 * Enhances prompt for seamless pattern creation
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
  
  // Check if seamless keywords are already present
  const hasSeamless = seamlessKeywords.some(keyword => 
    prompt.toLowerCase().includes(keyword.toLowerCase())
  );
  
  if (hasSeamless) {
    return prompt;
  }
  
  return `${prompt}, seamless pattern, tileable, high quality, detailed, professional design for textile printing`;
}

/**
 * API key validation
 */
export function validateApiKey(apiKey) {
  if (!apiKey || apiKey.trim() === '') {
    return { valid: false, error: 'API key cannot be empty' };
  }
  
  if (!apiKey.startsWith('r8_')) {
    return { valid: false, error: 'API key must start with r8_' };
  }
  
  if (apiKey.length < 40) {
    return { valid: false, error: 'API key is too short' };
  }
  
  return { valid: true };
}
