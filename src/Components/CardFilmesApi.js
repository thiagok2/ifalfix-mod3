// Arquivo: Components/CardFilme.js

import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import './CardFilmesApi.css';

function CardFilme({ filme }) {
    if (!filme) return null;

    const sinopseCurta = filme.sinopse?.substring(0, 150) + '...';

    return (
        <Link to={`/filme/${filme.id}`} className='container-filme'>
            <div className='img-container'>
                {filme.fotoThumbnail ? (
                    <img src={filme.fotoThumbnail} className='foto' alt={`Pôster de ${filme.titulo}`} />
                ) : (
                    <div className="placeholder-imagem">Imagem Indisponível</div>
                )}
            </div>
            <div className='header-filme'>
                <span className='filme-titulo'>{filme.titulo}</span>
            </div>
            <div className='filme-subtitulo'>
                <div>{filme.nota_avaliacao?.toFixed(1)} <FaStar className='star'/></div>
                <div className='faixa'>{filme.faixa_etaria ? '18' : 'L'}</div>
            </div>
            <div className='introducao'>
                {sinopseCurta}
            </div>
            <div className='footer-filme'>
                <div className='footer-item'>Gênero : {filme.genero}</div>
                <div className='footer-item'><AiOutlineLike  className='like'/> {filme.curtidas}</div>
            </div>
        </Link>
    );
}

export default CardFilme;