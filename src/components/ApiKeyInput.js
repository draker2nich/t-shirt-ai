import React, { useState } from 'react';
import { AlertCircle, Eye, EyeOff } from './Icons';

export default function ApiKeyInput({ apiKey, onApiKeyChange, error }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        API Key
      </label>

      <div className="relative">
        <input
          type={isVisible ? 'text' : 'password'}
          value={apiKey}
          onChange={(e) => onApiKeyChange(e.target.value)}
          placeholder="r8_..."
          className={`w-full px-3 py-2.5 pr-10 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
            error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
          }`}
        />
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {error && (
        <div className="mt-2 flex items-start gap-2 text-red-600 text-xs">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {!error && apiKey && (
        <div className="mt-2 flex items-center gap-2 text-emerald-600 text-xs">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>API key validated</span>
        </div>
      )}
    </div>
  );
}
