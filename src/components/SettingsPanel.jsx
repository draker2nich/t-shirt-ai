import React from 'react';

export default function SettingsPanel({ settings, onSettingsChange, disabled }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-sm font-medium text-gray-700 mb-4">Generation Settings</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pattern Type */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Pattern Type
          </label>
          <select 
            value={settings.patternType}
            onChange={(e) => onSettingsChange({ ...settings, patternType: e.target.value })}
            disabled={disabled}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
          >
            <option value="seamless">Seamless Repeating</option>
            <option value="composition">Full Composition</option>
            <option value="geometric">Geometric</option>
          </select>
        </div>

        {/* Style */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Art Style
          </label>
          <select 
            value={settings.style}
            onChange={(e) => onSettingsChange({ ...settings, style: e.target.value })}
            disabled={disabled}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
          >
            <option value="realistic">Realistic</option>
            <option value="abstract">Abstract</option>
            <option value="minimalist">Minimalist</option>
            <option value="vintage">Vintage</option>
            <option value="watercolor">Watercolor</option>
            <option value="geometric">Geometric</option>
            <option value="cyberpunk">Cyberpunk</option>
          </select>
        </div>

        {/* Number of Variants */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Variants: {settings.numberOfVariants}
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
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>2</span>
            <span>4</span>
            <span>6</span>
          </div>
        </div>

        {/* Detail Level */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Detail Level
          </label>
          <select 
            value={settings.detailLevel}
            onChange={(e) => onSettingsChange({ ...settings, detailLevel: e.target.value })}
            disabled={disabled}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
          >
            <option value="low">Low (Faster)</option>
            <option value="medium">Medium</option>
            <option value="high">High (Slower)</option>
          </select>
        </div>
      </div>

      {/* Note */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
        <p className="text-xs text-blue-800">
          <strong>Tip:</strong> Use "Seamless Repeating" for best results on apparel
        </p>
      </div>
    </div>
  );
}
