import React, { useState, useEffect } from 'react';
import { Shirt, Sparkles } from './components/Icons';
import ApiKeyInput from './components/ApiKeyInput';
import PromptInput from './components/PromptInput';
import SettingsPanel from './components/SettingsPanel';
import DesignGallery from './components/DesignGallery';
import TShirtPreview from './components/TShirtPreview';
import { generateDesigns, validateApiKey } from './services/replicateService';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [apiKeyError, setApiKeyError] = useState('');
  const [prompt, setPrompt] = useState('');
  const [settings, setSettings] = useState({
    patternType: 'seamless',
    style: 'realistic',
    numberOfVariants: 4,
    detailLevel: 'medium'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDesigns, setGeneratedDesigns] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [viewMode, setViewMode] = useState('front');
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [progress, setProgress] = useState(0);

  // Загрузка API ключа
  useEffect(() => {
    const savedApiKey = localStorage.getItem('replicate_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Сохранение API ключа
  const handleApiKeyChange = (newApiKey) => {
    setApiKey(newApiKey);
    setApiKeyError('');
    
    if (newApiKey.trim()) {
      localStorage.setItem('replicate_api_key', newApiKey);
    } else {
      localStorage.removeItem('replicate_api_key');
    }
  };

  // Генерация дизайнов
  const handleGenerate = async () => {
    const validation = validateApiKey(apiKey);
    if (!validation.valid) {
      setApiKeyError(validation.error);
      return;
    }

    if (!prompt.trim()) {
      setError('Please enter a design description');
      return;
    }

    setIsGenerating(true);
    setError('');
    setGeneratedDesigns([]);
    setSelectedDesign(null);
    setProgress(0);

    try {
      // Симуляция прогресса
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          return prev + 10;
        });
      }, 2000);

      const designs = await generateDesigns(apiKey, prompt, settings.numberOfVariants);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      if (designs.length === 0) {
        throw new Error('No designs generated');
      }

      setTimeout(() => {
        setGeneratedDesigns(designs);
        setSelectedDesign(designs[0]);
        setProgress(0);
      }, 300);
    } catch (err) {
      console.error('Generation error:', err);
      setError(err.message || 'Generation failed. Please try again.');
      setProgress(0);
    } finally {
      setIsGenerating(false);
    }
  };

  // Скачивание изображения
  const handleDownload = async () => {
    if (!selectedDesign) return;

    try {
      const response = await fetch(selectedDesign.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `design-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Download failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shirt className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">AI Design Studio</h1>
                <p className="text-xs text-gray-500">Generate textile patterns with AI</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {showSettings ? 'Hide' : 'Settings'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Settings Panel (Collapsible) */}
        {showSettings && (
          <div className="mb-6 space-y-4">
            <ApiKeyInput
              apiKey={apiKey}
              onApiKeyChange={handleApiKeyChange}
              error={apiKeyError}
            />
            <SettingsPanel
              settings={settings}
              onSettingsChange={setSettings}
              disabled={isGenerating}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Input */}
          <div>
            <PromptInput
              prompt={prompt}
              onPromptChange={setPrompt}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              disabled={!apiKey}
            />
          </div>

          {/* Right: Results */}
          <div className="space-y-6">
            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Loading */}
            {isGenerating && (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-sm font-medium text-gray-700 mb-2">Generating designs...</p>
                {progress > 0 && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{progress}%</p>
                  </div>
                )}
              </div>
            )}

            {/* Gallery */}
            {!isGenerating && generatedDesigns.length > 0 && (
              <>
                <DesignGallery
                  designs={generatedDesigns}
                  selectedDesign={selectedDesign}
                  onSelectDesign={setSelectedDesign}
                />
                <TShirtPreview
                  design={selectedDesign}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  onRegenerate={handleGenerate}
                  onDownload={handleDownload}
                  isRegenerating={isGenerating}
                />
              </>
            )}

            {/* Empty State */}
            {!isGenerating && generatedDesigns.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
                <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">No designs yet</p>
                <p className="text-sm text-gray-400">Enter a prompt to generate</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
