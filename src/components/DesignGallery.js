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
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Сгенерированные варианты ({designs.length})
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {designs.map((design) => (
          <button
            key={design.id}
            onClick={() => onSelectDesign(design)}
            className={`relative rounded-lg overflow-hidden border-2 transition-all transform hover:scale-105 ${
              selectedDesign?.id === design.id
                ? 'border-primary-600 ring-2 ring-primary-200 shadow-lg'
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <div className="aspect-square">
              <img
                src={design.url}
                alt={`Design ${design.index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {selectedDesign?.id === design.id && (
              <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                Выбрано
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
              <p className="text-white text-xs font-medium">
                Вариант {design.index + 1}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}