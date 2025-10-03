import React from 'react';
import { Sparkles } from './Icons';

const EXAMPLE_PROMPTS = [
  "закат на океане с дельфинами в розово-фиолетовых тонах, seamless pattern",
  "абстрактные геометрические фигуры в стиле Memphis, яркие цвета, tileable pattern",
  "тропические листья и цветы, акварельный стиль, бесшовный узор",
  "космос со звездами и планетами, темно-синий фон, repeating pattern",
  "японские волны в традиционном стиле, бирюзовый и белый, seamless",
  "неоновые линии и киберпанк элементы, черный фон, geometric pattern",
  "винтажные цветы в стиле 70-х, пастельные тона, retro pattern"
];

export default function PromptInput({ 
  prompt, 
  onPromptChange, 
  onGenerate, 
  isGenerating,
  disabled 
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Опишите желаемый дизайн
      </label>
      
      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="Например: закат на океане с дельфинами в розово-фиолетовых тонах..."
        rows="4"
        disabled={disabled}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
      />
      
      <button
        onClick={onGenerate}
        disabled={isGenerating || disabled || !prompt.trim()}
        className="w-full mt-4 bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        {isGenerating ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Генерация... (20-30 сек)
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Создать дизайн
          </>
        )}
      </button>
      
      {/* Примеры промтов */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Примеры для вдохновения
        </h3>
        <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-hide">
          {EXAMPLE_PROMPTS.map((example, idx) => (
            <button
              key={idx}
              onClick={() => onPromptChange(example)}
              disabled={disabled}
              className="w-full text-left px-4 py-3 text-sm bg-gray-50 hover:bg-primary-50 rounded-lg transition-colors text-gray-700 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}