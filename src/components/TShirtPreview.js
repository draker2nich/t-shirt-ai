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
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-300 p-16 text-center">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-2xl opacity-20"></div>
          <svg 
            className="relative w-20 h-20 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-xl font-bold text-gray-900 mb-2">
          Дизайн не выбран
        </p>
        <p className="text-sm text-gray-600">
          Введите описание и сгенерируйте дизайны для предпросмотра
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-xl">
      {/* Заголовок с переключателем видов */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
          <h3 className="text-sm font-bold text-gray-900">Предпросмотр на футболке</h3>
        </div>
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl shadow-inner">
          <button
            onClick={() => onViewModeChange('front')}
            className={`px-4 py-2 text-xs rounded-lg font-bold transition-all ${
              viewMode === 'front'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white'
            }`}
          >
            Спереди
          </button>
          <button
            onClick={() => onViewModeChange('back')}
            className={`px-4 py-2 text-xs rounded-lg font-bold transition-all ${
              viewMode === 'back'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white'
            }`}
          >
            Сзади
          </button>
        </div>
      </div>

      {/* Предпросмотр футболки */}
      <div className="relative bg-gradient-to-br from-gray-100 via-gray-50 to-white rounded-2xl p-10 flex items-center justify-center min-h-[450px] mb-5 border-2 border-gray-200/50 shadow-inner overflow-hidden">
        {/* Декоративные элементы фона */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-indigo-200 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-purple-200 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-72 h-96 z-10">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* SVG футболки */}
              <svg viewBox="0 0 200 250" className="w-full h-full drop-shadow-2xl">
                <defs>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.15"/>
                  </filter>
                  <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#f8fafc', stopOpacity: 1}} />
                  </linearGradient>
                </defs>
                <path
                  d="M 50 30 L 40 50 L 40 220 L 160 220 L 160 50 L 150 30 L 130 40 C 120 45 110 50 100 50 C 90 50 80 45 70 40 Z"
                  fill="url(#shirtGradient)"
                  stroke="#cbd5e1"
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
                  alt="Дизайн на футболке"
                  className="w-full h-full object-cover"
                  style={{
                    opacity: 0.95,
                    mixBlendMode: 'multiply'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Бейдж предпросмотра */}
        <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg border border-gray-200/50 font-medium">
          ⚡ Предпросмотр
        </div>
      </div>

      {/* Информация о дизайне */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-5 border border-indigo-200/50">
        <p className="text-xs text-indigo-900 font-semibold mb-2 flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Описание дизайна:
        </p>
        <p className="text-sm text-gray-800 leading-relaxed">{design.prompt}</p>
      </div>

      {/* Кнопки действий */}
      <div className="flex gap-3">
        <button
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        >
          <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
          {isRegenerating ? 'Генерация...' : 'Пересоздать'}
        </button>
        <button
          onClick={onDownload}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] text-sm"
        >
          <Download className="w-4 h-4" />
          Скачать
        </button>
      </div>
    </div>
  );
}
