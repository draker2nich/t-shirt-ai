import React, { useState, useEffect } from 'react';
import { Shirt, Sparkles, Settings, X } from './components/Icons';
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
  const [imageStatuses, setImageStatuses] = useState([]);

  // Загружаем API ключ из localStorage
  useEffect(() => {
    const savedApiKey = localStorage.getItem('replicate_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setShowSettings(true);
    }
  }, []);

  // Сохраняем API ключ в localStorage
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
      setShowSettings(true);
      return;
    }

    if (!prompt.trim()) {
      setError('Пожалуйста, введите описание дизайна');
      return;
    }

    setIsGenerating(true);
    setError('');
    setGeneratedDesigns([]);
    setSelectedDesign(null);
    setImageStatuses([]);

    try {
      const designs = await generateDesigns(
        apiKey, 
        prompt, 
        settings.numberOfVariants,
        (statuses) => {
          setImageStatuses(statuses);
        }
      );
      
      if (designs.length === 0) {
        throw new Error('Дизайны не были сгенерированы');
      }

      setGeneratedDesigns(designs);
      setSelectedDesign(designs[0]);
      setImageStatuses([]);
    } catch (err) {
      console.error('Ошибка генерации:', err);
      setError(err.message || 'Генерация не удалась. Попробуйте снова.');
      setImageStatuses([]);
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
      setError('Не удалось скачать изображение');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Шапка */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl blur-lg opacity-40"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Shirt className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  AI Дизайн Студия
                </h1>
                <p className="text-xs text-gray-600 mt-0.5">Создавайте уникальные паттерны для одежды</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-white rounded-xl transition-all hover:shadow-md border border-gray-200/50"
            >
              <Settings className="w-4 h-4" />
              Настройки
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Левая панель: Ввод */}
          <div>
            <PromptInput
              prompt={prompt}
              onPromptChange={setPrompt}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              disabled={!apiKey}
            />
          </div>

          {/* Правая панель: Результаты */}
          <div className="space-y-6">
            {/* Ошибка */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-start gap-2 shadow-sm">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Прогресс генерации с детальными статусами */}
            {isGenerating && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-xl">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-lg font-bold text-gray-900 mb-2">Генерация дизайнов...</p>
                  <p className="text-sm text-gray-600">Обычно это занимает 20-30 секунд</p>
                </div>

                {/* Детальный прогресс для каждого изображения */}
                <div className="space-y-3">
                  {imageStatuses.map((status, index) => (
                    <div 
                      key={index} 
                      className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-200/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-900">
                          Вариант {index + 1}
                        </span>
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                          status.stage === 'completed' ? 'bg-green-100 text-green-700' :
                          status.stage === 'generating' ? 'bg-blue-100 text-blue-700' :
                          status.stage === 'loading' ? 'bg-purple-100 text-purple-700' :
                          status.stage === 'error' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {status.message}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-2 transition-all duration-500 ${
                            status.stage === 'completed' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                            status.stage === 'generating' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                            status.stage === 'loading' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                            status.stage === 'error' ? 'bg-red-500' :
                            'bg-gradient-to-r from-gray-400 to-gray-500'
                          } ${status.stage === 'generating' || status.stage === 'loading' ? 'animate-pulse' : ''}`}
                          style={{ 
                            width: status.stage === 'completed' ? '100%' :
                                   status.stage === 'generating' ? '60%' :
                                   status.stage === 'loading' ? '90%' :
                                   status.stage === 'waiting' ? '30%' :
                                   '10%'
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center text-xs text-gray-500">
                  <p>💡 <strong>Совет:</strong> Чем детальнее описание, тем лучше результат</p>
                </div>
              </div>
            )}

            {/* Галерея */}
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

            {/* Пустое состояние */}
            {!isGenerating && generatedDesigns.length === 0 && (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-300 p-16 text-center">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-2xl opacity-20"></div>
                  <Sparkles className="relative w-16 h-16 text-gray-400" />
                </div>
                <p className="text-xl font-bold text-gray-900 mb-2">Пока нет дизайнов</p>
                <p className="text-sm text-gray-600">Введите описание и нажмите "Создать дизайн" для начала</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Модальное окно настроек */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 flex items-center justify-between rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Настройки</h2>
                  <p className="text-xs text-indigo-100">Настройте API ключ и параметры генерации</p>
                </div>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="text-white/80 hover:text-white transition-colors hover:bg-white/10 p-2 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
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
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl transition-all hover:shadow-lg hover:scale-105"
                >
                  Готово
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
