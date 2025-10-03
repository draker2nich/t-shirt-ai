import React from 'react';
import { Sparkles } from './Icons';

const EXAMPLE_PROMPTS = [
  "sunset over ocean with dolphins in pink-purple tones, seamless pattern",
  "abstract geometric shapes Memphis style, vibrant colors, tileable pattern",
  "tropical leaves and flowers, watercolor style, seamless pattern",
  "space with stars and planets, dark blue background, repeating pattern",
  "japanese waves traditional style, turquoise and white, seamless",
  "neon lines cyberpunk elements, black background, geometric pattern",
  "vintage flowers 70s style, pastel tones, retro pattern"
];

export default function PromptInput({ 
  prompt, 
  onPromptChange, 
  onGenerate, 
  isGenerating,
  disabled 
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Design Description
      </label>
      
      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="Describe your design..."
        rows="4"
        disabled={disabled}
        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none disabled:bg-gray-50 disabled:text-gray-500 transition-all"
      />
      
      <button
        onClick={onGenerate}
        disabled={isGenerating || disabled || !prompt.trim()}
        className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        {isGenerating ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Generate Design
          </>
        )}
      </button>
      
      {/* Example Prompts */}
      <div className="mt-6">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
          Quick Start
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {EXAMPLE_PROMPTS.map((example, idx) => (
            <button
              key={idx}
              onClick={() => onPromptChange(example)}
              disabled={disabled}
              className="w-full text-left px-3 py-2 text-xs bg-gray-50 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 hover:text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed border border-transparent hover:border-indigo-200"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
