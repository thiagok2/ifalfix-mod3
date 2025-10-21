import React from 'react';
import './FilmePageSkeleton.css'; // Importe o CSS para os estilos do skeleton

// Componente para simular um card em um carrossel
const SkeletonCard = () => (
    <div className="skeleton-card">
        <div className="skeleton-card-image"></div>
        <div className="skeleton-card-title"></div>
    </div>
);

const FilmePageSkeleton = () => {
    return (
        <div className="FilmePageSkeleton">
            {/* Esqueleto da NaveBar */}
            <div className="skeleton-line full-width nav-bar-height"></div>

            <div className="PaidetodosFilme">
                {/* Esqueleto do Banner */}
                <div className="divFilmeBanner">
                    <div className="skeleton-line banner-height"></div>
                </div>

                {/* Esqueleto do Header/Infos */}
                <div className="infos">
                    <div className="skeleton-line medium-height half-width"></div>
                    <div className="skeleton-line small-height three-quarter-width"></div>
                    <div className="skeleton-line small-height full-width"></div>
                    <div className="skeleton-line small-height quarter-width"></div>
                </div>
            </div>

            {/* Esqueleto do Carrossel Similares */}
            <div className="container-similares section-spacing">
                <div className="skeleton-line medium-height quarter-width title-spacing"></div>
                <div className="skeleton-carousel-items">
                    <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
                </div>
            </div>

            {/* Esqueleto do Carrossel Recomendados */}
            <div className="container-recomendados section-spacing">
                <div className="skeleton-line medium-height quarter-width title-spacing"></div>
                <div className="skeleton-carousel-items">
                    <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
                </div>
            </div>

            {/* Esqueleto de Comentários */}
            <div className="container-comentarios section-spacing">
                 <div className="skeleton-line medium-height quarter-width title-spacing"></div>
                 <div className="skeleton-line small-height full-width comment-spacing"></div>
                 <div className="skeleton-line small-height half-width comment-spacing"></div>
            </div>
        </div>
    );
};

export default FilmePageSkeleton;