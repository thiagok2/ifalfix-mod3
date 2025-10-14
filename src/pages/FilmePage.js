// Arquivo: FilmePage.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FilmesServiceApi from "../Services/FilmesServiceApi";

// Seus componentes de UI
import Banner from "../Components/FilmeBanner";
import Header from '../Components/FilmeHeader';
import ModeladorTrailer from '../Components/ModeladorTrailer'; // <- O nome do componente do Modal
import ComentariosContainer from '../Components/ComentariosContainer';
import Carrossel from "../Components/Carrossel";
import NotFound from "./NotFound";
import NaveBar from "../Components/NavBar";

// Estilos
import "./FilmePage.css";

function FilmePage() {
    const { id, tipo } = useParams();

    // CORRIGIDO: Padronizando os nomes para camelCase (padrão do React)
    const [trailerKey, setTrailerKey] = useState(null); 
    const [isModeladorOpen, setIsModeladorOpen] = useState(false);
    
    const [filme, setFilme] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [similares, setSimilares] = useState([]);
    const [recomendacao, setRecomendacao] = useState([]);

    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        const fetchFilme = async () => {
            if (!id || !id ) return ;
            
            
            setCarregando(true);
            setComentarios([]);
            setFilme(null);
            setTrailerKey(null); // Limpa a chave do trailer anterior

            const dadosDoFilme = await FilmesServiceApi.getById(id, tipo);
            setFilme(dadosDoFilme);

            const videoData = await FilmesServiceApi.getVideoTraile(id, tipo);

            // CORRIGIDO: Usando 'YouTube' com letras maiúsculas, como vem da API
            const oficialTrailer = videoData.results.find(
                (video) => video.type === 'Trailer' && video.site === 'YouTube' && video.official
            );
            
            if (oficialTrailer) {
                setTrailerKey(oficialTrailer.key);
            } else {
                const anyTrailer = videoData.results.find(
                    (video) => video.type === 'Trailer' && video.site === 'YouTube'
                );
                if (anyTrailer) {
                    setTrailerKey(anyTrailer.key);
                }
            }
            
            if (dadosDoFilme) {
                const similaresData = await FilmesServiceApi.getSimilar(id, tipo);
                setSimilares(similaresData);

                const recomendacaoData = await FilmesServiceApi.getRecomedado(id, tipo);
                setRecomendacao(recomendacaoData);

                const comentariosData = await FilmesServiceApi.getComentarios(id, tipo);
                setComentarios(comentariosData.results || []);
            }
            setCarregando(false);
        };

        fetchFilme();
    }, [id, tipo]);

    // Função para ABRIR o modal
    const headerOpenModelador = () => {
       // CORRIGIDO: Usando a variável com o nome correto 'trailerKey'
       if (trailerKey) {    
        setIsModeladorOpen(true);
       } else {
        alert('Trailer não encontrado');
       }
    };

    // NOVO: Função para FECHAR o modal que estava faltando
    const handleCloseModal = () => {
        setIsModeladorOpen(false);
    };

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
                    <Header filme={filme} onAssistirClicado={headerOpenModelador}/>
                </div>
            </div> 
              <div className="container-comentarios">
                <ComentariosContainer comentarios={comentarios} nota_avaliacao={filme.vote_average} />
            </div>

            <div className="container-similares">
                <Carrossel listadeFilmes={similares} descricao="Filmes Similares" />
            </div>

            <div className="container-recomendados">
                <Carrossel listadeFilmes={recomendacao} descricao="Recomendados" />
            </div>

         
            
            {/* CORRIGIDO: Passando as props com os nomes corretos */}
            <ModeladorTrailer 
                isOpen={isModeladorOpen} 
                onClose={handleCloseModal}  
                trailerKey={trailerKey} 
            />
        </div>
    );
}

export default FilmePage;