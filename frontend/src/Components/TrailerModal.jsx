import React from 'react'

function TrailerModal({ videoKey, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10002] flex items-center justify-center transition-all duration-300"
         onClick={onClose}>
      <div className="w-[90vw] md:w-[80vw] h-[60vh] md:h-[80vh] max-w-5xl transform transition-all duration-300 scale-95 hover:scale-100" 
           onClick={e => e.stopPropagation()}>
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          width="100%"
          height="100%"
          allow="autoplay"
          className="rounded-lg shadow-2xl"
        ></iframe>
      </div>
    </div>
  )
}

export default TrailerModal
