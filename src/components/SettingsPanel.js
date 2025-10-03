import React from 'react';

export default function SettingsPanel({ settings, onSettingsChange, disabled }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Настройки генерации</h3>
      
      <div className="space-y-4">
        {/* Тип паттерна */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Тип паттерна
          </label>
          <select 
            value={settings.patternType}
            onChange={(e) => onSettingsChange({ ...settings, patternType: e.target.value })}
            disabled={disabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          >
            <option value="seamless">Бесшовный повторяющийся</option>
            <option value="composition">Цельная композиция</option>
            <option value="geometric">Геометрический</option>
          </select>
        </div>

        {/* Стиль */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Художественный стиль
          </label>
          <select 
            value={settings.style}
            onChange={(e) => onSettingsChange({ ...settings, style: e.target.value })}
            disabled={disabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          >
            <option value="realistic">Реалистичный</option>
            <option value="abstract">Абстрактный</option>
            <option value="minimalist">Минималистичный</option>
            <option value="vintage">Винтажный</option>
            <option value="watercolor">Акварель</option>
            <option value="geometric">Геометрический</option>
            <option value="cyberpunk">Киберпанк</option>
          </select>
        </div>

        {/* Количество вариантов */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Количество вариантов: {settings.numberOfVariants}
          </label>
          <input
            type="range"
            min="2"
            max="6"
            value={settings.numberOfVariants}
            onChange={(e) => onSettingsChange({ ...settings, numberOfVariants: parseInt(e.target.value) })}
            disabled={disabled}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>2</span>
            <span>4</span>
            <span>6</span>
          </div>
        </div>

        {/* Детализация */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Уровень детализации
          </label>
          <select 
            value={settings.detailLevel}
            onChange={(e) => onSettingsChange({ ...settings, detailLevel: e.target.value })}
            disabled={disabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          >
            <option value="low">Низкая (быстрее)</option>
            <option value="medium">Средняя</option>
            <option value="high">Высокая (дольше)</option>
          </select>
        </div>
      </div>

      {/* Подсказка */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800">
          💡 <strong>Совет:</strong> Для лучшей стыковки швов выбирайте "Бесшовный повторяющийся" тип паттерна
        </p>
      </div>
    </div>
  );
}