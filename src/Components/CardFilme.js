// Components/CardFilme.js
import { Link } from "react-router-dom";
import "./CardFilme.css";

function CardFilme({ filme, expandido = false }) {
  if (!filme) {
    return null;
  }

  return (
    <div className="card-container">
      <Link className="card" to={`/filme/${filme.tipo}/${filme.id}`}
        style={{ backgroundImage: `url(${filme.fotoThumbnail})` }}>
        <div className="titulo-card-heard">
          {filme.titulo}
        </div>
      </Link>
      {expandido && (
        <div className="card-footer">
          <span className="genero">Gênero:{filme.genero}</span>
        </div>
      )}
    </div>
  );
}

export default CardFilme;