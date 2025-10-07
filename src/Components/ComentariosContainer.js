import ComentariosService from '../Services/ComentariosService';
import './ComentariosContainer.css'
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from 'react';
//coment
function ComentariosContainer({ filme, showAvaliacao=true }) {

  const comentarios = ComentariosService.getByFilmeId(filme.id);
  const [tamanho, setTamanho] = useState(0)


  useEffect(() => {
    setTamanho(comentarios.length);
  }, [comentarios]);

  if(tamanho == 0) return null;

  return (
    <div className='all-container'>
      {
        showAvaliacao && 
          <div className='info-avaliacao'>
            <strong>Avaliação Média: </strong>
            <strong className='avaliação-texto'>
              <span> <FaStar className='estrela' /> {filme.nota_avaliacao}/10</span>
            </strong>
          </div>
      }
      

      <div className="comentario-container">
          <strong className='avalicao'>Avaliações</strong>

          <div className='lista-comentarios'>
        {
          comentarios.map((comentario, idx) => (
            
            <div className='comentario' key={idx}>
              <div className="comentario-header">
                <img src={comentario.avatar_foto} className='foto-avatar-comentario' alt="image-perfil-comentario" />
                <strong>{comentario.autor}</strong>
              </div>

              <p className="comentario-texto">{comentario.texto}</p>


              <div className='estrelas'>
                <span> <FaStar className='estrela' /> {comentario.avaliacao}/10</span>
                <span className="comentario-data">{comentario.data_comentario}</span>
              </div>

            </div>

          ))
        }
        </div>
      </div>
    </div>
  );
}

export default ComentariosContainer;
