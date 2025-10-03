import React from 'react';
import { RefreshCw, Download } from './Icons';

export default function TShirtPreview({ 
  design, 
  viewMode, 
  onViewModeChange,
  onRegenerate,
  onDownload,
  isRegenerating 
}) {
  if (!design) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12 text-center">
        <svg 
          className="w-16 h-16 text-gray-300 mx-auto mb-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <p className="text-gray-500 text-lg">
          Введите описание дизайна и нажмите "Создать дизайн"
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Генерация займет 20-30 секунд
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header с переключателями вида */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Предпросмотр на футболке</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onViewModeChange('front')}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
              viewMode === 'front'
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Перед
          </button>
          <button
            onClick={() => onViewModeChange('back')}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
              viewMode === 'back'
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Спина
          </button>
        </div>
      </div>

      {/* Превью футболки */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 flex items-center justify-center min-h-[400px] mb-4">
        <div className="relative w-64 h-80">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* SVG футболки */}
              <svg viewBox="0 0 200 250" className="w-full h-full drop-shadow-2xl">
                {/* Основная форма футболки */}
                <defs>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15"/>
                  </filter>
                </defs>
                <path
                  d="M 50 30 L 40 50 L 40 220 L 160 220 L 160 50 L 150 30 L 130 40 C 120 45 110 50 100 50 C 90 50 80 45 70 40 Z"
                  fill="white"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                  filter="url(#shadow)"
                />
              </svg>
              
              {/* Наложение дизайна */}
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  clipPath: 'polygon(25% 12%, 20% 20%, 20% 88%, 80% 88%, 80% 20%, 75% 12%, 65% 16%, 50% 20%, 35% 16%)'
                }}
              >
                <img
                  src={design.url}
                  alt="Design on t-shirt"
                  className="w-full h-full object-cover"
                  style={{
                    opacity: 0.9,
                    mixBlendMode: 'multiply'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Водяной знак */}
        <div className="absolute bottom-4 right-4 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded">
          Предпросмотр
        </div>
      </div>

      {/* Информация о дизайне */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <p className="text-xs text-gray-600 font-medium mb-1">Промт:</p>
        <p className="text-sm text-gray-700">{design.prompt}</p>
      </div>

      {/* Кнопки действий */}
      <div className="flex gap-3">
        <button
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
          {isRegenerating ? 'Генерация...' : 'Новые варианты'}
        </button>
        <button
          onClick={onDownload}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
        >
          <Download className="w-4 h-4" />
          Скачать
        </button>
      </div>
    </div>
  );
}