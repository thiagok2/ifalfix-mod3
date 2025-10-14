// Arquivo: FilmePage.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FilmesServiceApi from "../Services/FilmesServiceApi"; // <- Mude para o serviço da API

// Seus componentes de UI
import Banner from "../Components/FilmeBanner";
import Header from '../Components/FilmeHeader';
import ComentariosContainer from '../Components/ComentariosContainer';
import Carrossel from "../Components/Carrossel";
import NotFound from "./NotFound";
import NaveBar from "../Components/NavBar";

// Estilos
import "./FilmePage.css";

function FilmePage() {
    const { id, tipo } = useParams();

    const [comentarios, setComentarios] = useState([]);
    const [filme, setFilme] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [similares, setSimilares] = useState([]);
    const [recomendacao, setRecomendacao] = useState([]);

    useEffect(() => {
        // Função para buscar os dados do filme
        const fetchFilme = async () => {
            if (!id) {
                setCarregando(false);
                return;
            }
            
            setCarregando(true);
            setFilme(null);

            console.log('tipo:'+ tipo)
            const dadosDoFilme = await FilmesServiceApi.getById(id, tipo);
            setFilme(dadosDoFilme);
            setCarregando(false);

            if(dadosDoFilme){
                const similares = await FilmesServiceApi.getSimilar(id, tipo);
                setSimilares(similares);

                const recomendacao = await FilmesServiceApi.getRecomedado(id, tipo);
                setRecomendacao(recomendacao);
            }
            setCarregando(false);
        };

        fetchFilme();
    }, [id,tipo]); // Este efeito roda sempre que o 'id' da URL mudar

    if (carregando) {
        return <div>Carregando filme...</div>;
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


            <div className="container-similares">
            <Carrossel listadeFilmes={similares} descricao="Filmes Similares" />
            </div>

            <div className="container-recomendados">
                <Carrossel listadeFilmes={recomendacao} descricao="Recomendados" />

            </div>


            <div className="container-comentarios">
                <ComentariosContainer filme={filme} />
            </div>
            <div>
     

            </div>


        </div>
    );
}

export default FilmePage;