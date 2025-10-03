import React, { useState } from 'react';
import { AlertCircle } from './Icons';

export default function ApiKeyInput({ apiKey, onApiKeyChange, error }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-primary-100">
      <div className="flex items-start justify-between mb-3">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            API Ключ Replicate
          </label>
          <p className="text-xs text-gray-500">
            Необходим для генерации изображений
          </p>
        </div>
        <a
          href="https://replicate.com/account/api-tokens"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary-600 hover:text-primary-700 font-medium hover:underline"
        >
          Получить ключ →
        </a>
      </div>

      <div className="relative">
        <input
          type={isVisible ? 'text' : 'password'}
          value={apiKey}
          onChange={(e) => onApiKeyChange(e.target.value)}
          placeholder="r8_ваш_ключ_здесь..."
          className={`w-full px-4 py-3 pr-24 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
            error ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
        />
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700 font-medium"
        >
          {isVisible ? 'Скрыть' : 'Показать'}
        </button>
      </div>

      {error && (
        <div className="mt-2 flex items-start gap-2 text-red-600 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {!error && apiKey && (
        <div className="mt-2 flex items-center gap-2 text-green-600 text-xs">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>API ключ добавлен</span>
        </div>
      )}

      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          <strong>Как получить ключ:</strong>
        </p>
        <ol className="text-xs text-gray-600 mt-1 ml-4 space-y-1 list-decimal">
          <li>Зарегистрируйтесь на replicate.com</li>
          <li>Перейдите в настройки аккаунта</li>
          <li>Создайте новый API токен</li>
          <li>Скопируйте и вставьте его сюда</li>
        </ol>
        <p className="text-xs text-gray-500 mt-2">
          💰 Первые $10 бесплатно для тестирования
        </p>
      </div>
    </div>
  );
}