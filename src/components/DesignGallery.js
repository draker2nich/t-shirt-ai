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
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        Generated Designs ({designs.length})
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {designs.map((design) => (
          <button
            key={design.id}
            onClick={() => onSelectDesign(design)}
            className={`relative rounded-lg overflow-hidden border-2 transition-all group ${
              selectedDesign?.id === design.id
                ? 'border-indigo-600 ring-2 ring-indigo-200 shadow-lg'
                : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
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
              <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-xs font-medium">
                Design {design.index + 1}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
