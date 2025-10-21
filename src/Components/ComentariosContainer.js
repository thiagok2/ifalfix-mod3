// Arquivo: ComentariosContainer.js
import './ComentariosContainer.css'
import { FaStar } from "react-icons/fa";
// Remova useState, useEffect e ComentariosService, pois não são mais necessários aqui.

// O componente agora recebe 'comentarios' e 'nota_avaliacao' como props
function ComentariosContainer({ comentarios = [], nota_avaliacao, showAvaliacao = true }) {

  // Se não houver comentários, exibe uma mensagem.
  if (comentarios.length === 0) {
    return (
      <div className='all-container'>
        {showAvaliacao && (
            <div className='info-avaliacao'>
              <strong>Avaliação Média: </strong>
              <strong className='avaliação-texto'>
                <span> <FaStar className='estrela' /> {nota_avaliacao ? nota_avaliacao.toFixed(1) : '0' }/10</span>
              </strong>
            </div>
        )}
        <div className="comentario-container">
            <strong className='avalicao'>Avaliações</strong>
            <p style={{marginTop: '10px'}}>Nenhum comentário para este título ainda.</p>
        </div>
      </div>
    );
  }

  // Se houver comentários, o código abaixo será executado
  return (
    <div className='all-container'>
      {showAvaliacao && 
          <div className='info-avaliacao'>
            <strong>Avaliação Média: </strong>
            <strong className='avaliação-texto'>
              <span> <FaStar className='estrela' /> {nota_avaliacao ? nota_avaliacao.toFixed(1) : '0'}/10</span>
            </strong>
          </div>
      }
      
      <div className="comentario-container">
          <strong className='avalicao'>Avaliações</strong>
          <div className='lista-comentarios'>
            {/* Agora 'comentarios.map' vai funcionar, pois garantimos que é um array */}
            {comentarios.map((review) => {
              // A API do TMDb não fornece avaliação por comentário, então vamos usar os dados que ela oferece
              const autor = review.author;
              const detalhesAutor = review.author_details;
              const conteudo = review.content;
              const dataCriacao = new Date(review.created_at).toLocaleDateString('pt-BR');
              
              // A API do TMDb usa 'avatar_path' dentro de 'author_details'
              const avatarPath = detalhesAutor.avatar_path ? `https://image.tmdb.org/t/p/w45${detalhesAutor.avatar_path}` : 'https://via.placeholder.com/45'; // Uma imagem padrão

              return (
                <div className='comentario' key={review.id}>
                  <div className="comentario-header">
                    <img src={avatarPath} className='foto-avatar-comentario' alt={`avatar de ${autor}`} />
                    <strong>{autor}</strong>
                  </div>
                  <p className="comentario-texto">{conteudo}</p>
                  <div className='estrelas'>
                    {/* A API de reviews do TMDb não tem uma nota por comentário, mas tem a data */}
                    <span className="comentario-data">Publicado em: {dataCriacao}</span>
                  </div>
                </div>
              );
            })}
          </div>
      </div>
    </div>
  );
}

export default ComentariosContainer;