// Adicione a importação do useRef
import React, { useState, useEffect, useRef } from "react";

import NavBar from '../Components/NavBar';
import { useParams } from 'react-router-dom';
import CardFilmeExtendido from '../Components/CardFilmeExtendido';
import { carregarDadosCatalogo } from "../Configuracoes/Catalogo";
import "./CatalogoPage.css";

function CatalogoPage() {
    const { tipo } = useParams();
    const [itemList, setItemList] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    // Crie uma referência para o contêiner do carrossel
    const carouselRef = useRef(null);

    useEffect(() => {
        carregarDadosCatalogo(tipo, setItemList, setCarregando, setErro);
    }, [tipo]);

    // Função para rolar para a direita ao clicar
    const handleNextClick = () => {
        if (carouselRef.current) {
            // O valor 300 pode ser ajustado conforme a largura dos seus cards + gap
            carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    // Função para rolar para a esquerda ao clicar
    const handlePrevClick = () => {
        if (carouselRef.current) {
            // O valor 300 pode ser ajustado conforme a largura dos seus cards + gap
            carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    if (carregando) {
        return <div>Carregando...</div>;
    }

    return (
        
        <div className='container'>
            <div className='navbar'>
                <NavBar />
            </div>

             
            <div className='containers-catalogo'>
                {
                    itemList.map((filme, idx) => 
                        <CardFilmeExtendido key={idx} filme={filme} />
                    )
                }

                {/* Adicione a ref ao seu contêiner de filmes */}
                <div className='containers-catalogo' ref={carouselRef}>
                    {
                        itemList.map((filme, idx) =>
                            <CardFilmeExtendido key={idx} filme={filme} />
                        )
                    }
                </div>

                {/* Botão de Navegação Direita */}
                <button className="carousel-button next" onClick={handleNextClick}>
                    &#8250;
                </button>
            </div>

        </div>
    )
}

export default CatalogoPage;