// Adicione a importação do useRef
import React, { useState, useEffect, useRef } from "react";

import NavBar from '../Components/NavBar';
import { useParams } from 'react-router-dom';
import CardFilmeExtendido from '../Components/CardFilmeExtendido';
import { carregarDadosCatalogo } from "../Configuracoes/Catalogo";
import "./CatalogoPage.css";
import FilmesServiceApi from "../Services/FilmesServiceApi";
import CarrosselGenero from "../Components/CarrosselGenero.js";

function CatalogoPage() {
    const { tipo } = useParams();
    const [itemList, setItemList] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    const [generoSelecionado, setGeneroSelecionado] = useState(null);


    useEffect(() => {
        carregarDadosCatalogo(tipo, setItemList, setCarregando, setErro, generoSelecionado);
    }, [generoSelecionado]);


    const handleFiltroGenero = (genero) => {
        console.log('catalogo:genero::'+genero)
        setGeneroSelecionado(genero);
    };

    const carouselRef = useRef(null);
    const handleNextClick = () => {
        if (carouselRef.current) {
            // O valor 300 pode ser ajustado conforme a largura dos seus cards + gap
            carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };
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

            <div >
                <CarrosselGenero handleFiltroGenero={handleFiltroGenero}/>
            </div>

            <div className='containers-catalogo'>
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