// Adicione a importação do useRef
import React, { useState, useEffect, useRef } from "react";

import NavBar from '../Components/NavBar';
import { useParams } from 'react-router-dom';
import CardFilmeExtendido from '../Components/CardFilmeExtendido';
import { carregarDadosCatalogo } from "../Configuracoes/Catalogo";
import "./CatalogoPage.css";
import CarrosselGenero from "../Components/CarrosselGenero.js";

// 1. IMPORTAÇÃO DO SKELETON
import CatalogoSkeleton from "../Components/CatalogoSkeleton"; // <- Adicione esta linha

function CatalogoPage() {
    const { tipo } = useParams();
    const [itemList, setItemList] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    const [generoSelecionado, setGeneroSelecionado] = useState(null);


    useEffect(() => {
        carregarDadosCatalogo(tipo, setItemList, setCarregando, setErro, generoSelecionado);
    }, [tipo, generoSelecionado]);


    const handleFiltroGenero = (genero) => {
        console.log('catalogo:genero::'+genero)
        // Redefine o estado de carregamento para true para mostrar o skeleton ao aplicar o filtro
        setCarregando(true); 
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

    // 2. RENDERIZAÇÃO CONDICIONAL COM O SKELETON
    if (carregando) {
        // Substitui o <div>Carregando...</div> pelo componente skeleton
        return (
            <div className='container'>
                <div className='navbar'>
                    <NavBar /> 
                </div>
                <CatalogoSkeleton />
            </div>
        );
    }
    
    // Se houve erro e não está carregando
    if (erro) {
        return <div>Erro ao carregar o catálogo: {erro.message}</div>; 
    }
    

    return (
        
        <div className='container'>
            <div className='navbar'>
                <NavBar />
            </div>

            <div >
                <CarrosselGenero handleFiltroGenero={handleFiltroGenero}/>
            </div>

            <div className='containers-catalogo2'>
                
                <div className='containers-catalogo' ref={carouselRef}>
                    {
                        itemList.map((filme, idx) =>
                            <CardFilmeExtendido key={idx} filme={filme} />
                        )
                    }
                </div>

            </div>

        </div>
    )
}

export default CatalogoPage;