import React from 'react';
import './ModeladorTrailer.css'; // Crie um arquivo CSS para estilizar
import { IoCloseCircle } from "react-icons/io5";

function ModeladorTrailer({ isOpen, onClose, trailerKey }) {
  // Se a prop 'isOpen' for falsa, o componente não renderiza nada
  if (!isOpen) {
    return null;
  }

  return (
    // Fundo escuro que, ao ser clicado, fecha o modal
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Botão para fechar */}
        <button className="modal-close-button" onClick={onClose}>
          <IoCloseCircle size={40} />
        </button>

        {/* Container responsivo para o vídeo */}
        <div className="video-responsive">
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Trailer"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ModeladorTrailer;