// Arquivo: FilmePage.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// 1. SERVIÇO
import FilmesServiceApi from "../Services/FilmesServiceApi";

// 2. COMPONENTES DE UI - Verifique se todos usam 'export default'
import Banner from "../Components/FilmeBanner";
import Header from '../Components/FilmeHeader';
import ComentariosContainer from '../Components/ComentariosContainer';
import Carrossel from "../Components/Carrossel";
import NotFound from "./NotFound";
import NaveBar from "../Components/NavBar";
import FilmePageSkeleton from "../Components/FilmePageSkeleton"; 
import "./FilmePage.css";

function FilmePage() {
    const { id, tipo } = useParams();

    const [comentarios, setComentarios] = useState([]);
    const [filme, setFilme] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [similares, setSimilares] = useState([]);
    const [recomendacao, setRecomendacao] = useState([]);

    useEffect(() => {
        const fetchFilme = async () => {
            if (!id) {
                setCarregando(false);
                return;
            }

            setCarregando(true);
            setFilme(null);

            console.log('tipo:'+ tipo)
            
            try {
                const dadosDoFilme = await FilmesServiceApi.getById(id, tipo);
                setFilme(dadosDoFilme);

                // Se o filme existe, busca os relacionados.
                if(dadosDoFilme){
                    const similaresData = await FilmesServiceApi.getSimilar(id, tipo);
                    setSimilares(similaresData);

                    const recomendacaoData = await FilmesServiceApi.getRecomedado(id, tipo);
                    setRecomendacao(recomendacaoData);
                }
            } catch (error) {
                console.error("Erro ao buscar dados do filme:", error);
                setFilme(null); // Garante que se houver erro, exiba o NotFound
            }
            
            setCarregando(false);
        };

        fetchFilme();
    }, [id, tipo]); 


    if (carregando) {
        return <FilmePageSkeleton />;
    }

    if (!filme) {
        return <NotFound />;
    }

    return (
        <div className="Filme">
            <div className="Navbar">
                <NaveBar />
            </div>
            <div className="PaidetodosFilme">
                <div className="divFilmeBanner">
                    <Banner filme={filme} />
                </div>
                <div className="infos">
                    <Header filme={filme} />
                </div>
            </div>

            {similares.length > 0 && (
                <div className="container-similares">
                    <Carrossel listadeFilmes={similares} descricao="Filmes Similares" />
                </div>
            )}

            {recomendacao.length > 0 && (
                <div className="container-recomendados">
                    <Carrossel listadeFilmes={recomendacao} descricao="Recomendados" />
                </div>
            )}

            <div className="container-comentarios">
                <ComentariosContainer filme={filme} />
            </div>
            <div>
            </div>
        </div>
    );
}

export default FilmePage;