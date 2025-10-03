import React, { useState } from 'react';
import { AlertCircle } from './Icons';

export default function ApiKeyInput({ apiKey, onApiKeyChange, error }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">
          Replicate API Token
        </label>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          {isVisible ? 'Hide' : 'Show'}
        </button>
      </div>

      <input
        type={isVisible ? 'text' : 'password'}
        value={apiKey}
        onChange={(e) => onApiKeyChange(e.target.value)}
        placeholder="r8_..."
        className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
          error ? 'border-red-300 bg-red-50' : 'border-gray-300'
        }`}
      />

      {error && (
        <div className="mt-2 flex items-start gap-2 text-red-600 text-xs">
          <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {!error && apiKey && (
        <div className="mt-2 flex items-center gap-2 text-green-600 text-xs">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Connected</span>
        </div>
      )}
    </div>
  );
}
