import React from 'react';
import { Settings } from './Icons';

export default function SettingsPanel({ settings, onSettingsChange, disabled }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200/50 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <Settings className="w-5 h-5 text-indigo-600" />
        <h3 className="text-sm font-bold text-gray-900">Параметры генерации</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Тип паттерна */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">
            Тип паттерна
          </label>
          <select 
            value={settings.patternType}
            onChange={(e) => onSettingsChange({ ...settings, patternType: e.target.value })}
            disabled={disabled}
            className="w-full px-4 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors bg-white"
          >
            <option value="seamless">Бесшовный повторяющийся</option>
            <option value="composition">Цельная композиция</option>
            <option value="geometric">Геометрический</option>
          </select>
        </div>

        {/* Стиль */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">
            Художественный стиль
          </label>
          <select 
            value={settings.style}
            onChange={(e) => onSettingsChange({ ...settings, style: e.target.value })}
            disabled={disabled}
            className="w-full px-4 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors bg-white"
          >
            <option value="realistic">Реалистичный</option>
            <option value="abstract">Абстрактный</option>
            <option value="minimalist">Минималистичный</option>
            <option value="vintage">Винтаж</option>
            <option value="watercolor">Акварель</option>
            <option value="geometric">Геометрический</option>
            <option value="cyberpunk">Киберпанк</option>
          </select>
        </div>

        {/* Количество вариантов */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">
            Количество вариантов: {settings.numberOfVariants}
          </label>
          <input
            type="range"
            min="2"
            max="6"
            value={settings.numberOfVariants}
            onChange={(e) => onSettingsChange({ ...settings, numberOfVariants: parseInt(e.target.value) })}
            disabled={disabled}
            className="w-full h-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full appearance-none cursor-pointer disabled:opacity-50 slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
            <span>2</span>
            <span>4</span>
            <span>6</span>
          </div>
        </div>

        {/* Уровень детализации */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">
            Уровень детализации
          </label>
          <select 
            value={settings.detailLevel}
            onChange={(e) => onSettingsChange({ ...settings, detailLevel: e.target.value })}
            disabled={disabled}
            className="w-full px-4 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors bg-white"
          >
            <option value="low">Низкий (Быстрее)</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий (Медленнее)</option>
          </select>
        </div>
      </div>

      {/* Подсказка */}
      <div className="mt-5 px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl">
        <p className="text-xs text-indigo-900 leading-relaxed">
          <span className="font-bold">💡 Совет:</span> Используйте "Бесшовный повторяющийся" для лучших результатов на текстиле
        </p>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
          transition: all 0.2s;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.6);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
          transition: all 0.2s;
        }
        
        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.6);
        }
      `}</style>
    </div>
  );
}
