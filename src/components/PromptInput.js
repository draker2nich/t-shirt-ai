import React from 'react';
import { Sparkles } from './Icons';

const EXAMPLE_PROMPTS = [
  "закат над океаном с дельфинами в розово-фиолетовых тонах, бесшовный паттерн",
  "абстрактные геометрические фигуры в стиле Мемфис, яркие цвета, повторяющийся узор",
  "тропические листья и цветы, акварельный стиль, бесшовный паттерн",
  "космос со звездами и туманностью, темно-синий фон, повторяющийся паттерн",
  "японские волны в традиционном стиле, бирюзовый и белый, бесшовный узор",
  "неоновые кибер элементы, черный фон, геометрический паттерн",
  "винтажные цветы в стиле 70-х, пастельные тона, ретро узор"
];

export default function PromptInput({ 
  prompt, 
  onPromptChange, 
  onGenerate, 
  isGenerating,
  disabled 
}) {
  return (
    <div className="space-y-5">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-xl hover:shadow-2xl transition-shadow">
        <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></span>
          Описание дизайна
        </label>
        
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="Опишите желаемый дизайн подробно: цвета, стиль, элементы..."
          rows="5"
          disabled={disabled}
          className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none disabled:bg-gray-50 disabled:text-gray-500 transition-all placeholder:text-gray-400"
        />
        
        <button
          onClick={onGenerate}
          disabled={isGenerating || disabled || !prompt.trim()}
          className="w-full mt-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-3.5 px-6 rounded-xl font-bold hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 disabled:from-gray-300 disabled:via-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
              Генерация дизайнов...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Создать дизайн
            </>
          )}
        </button>
      </div>

      {/* Примеры промтов */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-5 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <h3 className="text-sm font-bold text-gray-900">
            Примеры для вдохновения
          </h3>
        </div>
        <div className="space-y-2 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
          {EXAMPLE_PROMPTS.map((example, idx) => (
            <button
              key={idx}
              onClick={() => onPromptChange(example)}
              disabled={disabled}
              className="w-full text-left px-4 py-3 text-xs bg-gradient-to-r from-gray-50 to-white hover:from-indigo-50 hover:to-purple-50 rounded-xl transition-all text-gray-700 hover:text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200/50 hover:border-indigo-300 hover:shadow-md group"
            >
              <div className="flex items-start gap-3">
                <span className="text-gray-400 group-hover:text-indigo-500 transition-colors flex-shrink-0 mt-0.5">
                  {idx + 1}.
                </span>
                <span className="flex-1 leading-relaxed">{example}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #6366f1, #a855f7);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #4f46e5, #9333ea);
        }
      `}</style>
    </div>
  );
}
