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
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-sm font-medium text-gray-700 mb-3">
        Generated ({designs.length})
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {designs.map((design) => (
          <button
            key={design.id}
            onClick={() => onSelectDesign(design)}
            className={`relative rounded-lg overflow-hidden border-2 transition-all ${
              selectedDesign?.id === design.id
                ? 'border-primary-600 ring-2 ring-primary-200'
                : 'border-gray-200 hover:border-gray-300'
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
              <div className="absolute top-2 right-2 w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
