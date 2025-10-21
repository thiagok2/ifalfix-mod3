import React from 'react';
import './CatalogoSkeleton.css';

const CatalogoSkeleton = () => {
    const skeletonGeneros = [
        'w-md', 'w-sm', 'w-lg', 'w-md', 
        'w-lg', 'w-sm', 'w-md', 'w-lg',
        'w-sm', 'w-md', 'w-md', 'w-sm',
        'w-lg', 'w-sm', 'w-lg', 'w-md',
    ];

    const skeletonCards = Array.from({ length: 8 }); // Suficiente para preencher a tela inicial

    return (
        <div className='container-skeleton'> 
            
            <div className="skeleton-generos">

                <div className="skeleton-tag w-sm"></div> 
                
                {skeletonGeneros.map((widthClass, index) => (
                    <div key={index} className={`skeleton-tag ${widthClass}`}></div>
                ))}
            </div>
            
            <div className='containers-catalogo2'> 

              
                <div className='containers-skeleton-catalogo'>
                    {skeletonCards.map((_, index) => (
                 
                        <div key={index} className="skeleton-card-extended">
                            <div className="skeleton-poster"></div> 
                            
                            <div className="skeleton-text line-3"></div> 

                            <div className="skeleton-text line-3"></div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default CatalogoSkeleton;