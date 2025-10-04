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
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <svg 
          className="w-16 h-16 text-gray-300 mx-auto mb-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <p className="text-gray-900 font-medium mb-1">
          No design selected
        </p>
        <p className="text-gray-500 text-sm">
          Enter a description and generate designs to preview
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header with view switcher */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">T-Shirt Preview</h3>
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => onViewModeChange('front')}
            className={`px-3 py-1.5 text-xs rounded-md font-medium transition-all ${
              viewMode === 'front'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Front
          </button>
          <button
            onClick={() => onViewModeChange('back')}
            className={`px-3 py-1.5 text-xs rounded-md font-medium transition-all ${
              viewMode === 'back'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Back
          </button>
        </div>
      </div>

      {/* T-Shirt Preview */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 flex items-center justify-center min-h-[400px] mb-4 border border-gray-200">
        <div className="relative w-64 h-80">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* SVG T-Shirt */}
              <svg viewBox="0 0 200 250" className="w-full h-full drop-shadow-xl">
                <defs>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.12"/>
                  </filter>
                </defs>
                <path
                  d="M 50 30 L 40 50 L 40 220 L 160 220 L 160 50 L 150 30 L 130 40 C 120 45 110 50 100 50 C 90 50 80 45 70 40 Z"
                  fill="white"
                  stroke="#d1d5db"
                  strokeWidth="2"
                  filter="url(#shadow)"
                />
              </svg>
              
              {/* Design Overlay */}
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
        
        {/* Preview Badge */}
        <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white/90 px-2 py-1 rounded-md backdrop-blur-sm border border-gray-200">
          Preview
        </div>
      </div>

      {/* Design Info */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-200">
        <p className="text-xs text-gray-500 font-medium mb-1">Prompt:</p>
        <p className="text-sm text-gray-900">{design.prompt}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
          {isRegenerating ? 'Generating...' : 'Regenerate'}
        </button>
        <button
          onClick={onDownload}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all shadow-sm hover:shadow-md text-sm"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  );
}
