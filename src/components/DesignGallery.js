import React from 'react';

export default function DesignGallery({ 
  designs, 
  selectedDesign, 
  onSelectDesign 
}) {
  if (designs.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
            <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          <h3 className="text-sm font-bold text-gray-900">
            Созданные дизайны
          </h3>
        </div>
        <span className="ml-auto text-xs font-semibold px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full">
          {designs.length}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {designs.map((design) => (
          <button
            key={design.id}
            onClick={() => onSelectDesign(design)}
            className={`relative rounded-xl overflow-hidden border-3 transition-all group ${
              selectedDesign?.id === design.id
                ? 'border-indigo-600 ring-4 ring-indigo-200 shadow-2xl scale-105'
                : 'border-gray-200 hover:border-indigo-300 hover:shadow-xl hover:scale-102'
            }`}
          >
            <div className="aspect-square relative">
              <img
                src={design.url}
                alt={`Дизайн ${design.index + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Градиентный оверлей при наведении */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            {/* Индикатор выбранного дизайна */}
            {selectedDesign?.id === design.id && (
              <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-xl animate-bounce-slow">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}

            {/* Номер дизайна */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-sm font-bold flex items-center gap-2">
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">
                  {design.index + 1}
                </span>
                Вариант {design.index + 1}
              </p>
            </div>
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}
