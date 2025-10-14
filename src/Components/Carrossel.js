import { useRef } from "react";
import CardFilme from "./CardFilme";
import "./Carrossel.css";

function Carrossel({ listadeFilmes, descricao, expandido = false }) {
  // Cria uma referência para o container do carrossel
  const carroselRef = useRef(null);

  // Funções para mover o carrossel
  const scrollLeft = () => {
    carroselRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carroselRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="minhaLista">
      <h2 className="titulo-carrossel">{descricao}</h2>

      {/* Container do carrossel + botões */}
      <div className="carrosel-container">
        <button className="carrossel-button prev" onClick={scrollLeft}>
          &#10094;
        </button>

        <div className="carrosel" ref={carroselRef}>
          {listadeFilmes.map((filme, idx) => (
            <CardFilme key={idx} filme={filme} expandido={expandido} />
          ))}
        </div>

        <button className="carrossel-button next" onClick={scrollRight}>
          &#10095;
        </button>
      </div>
    </div>
  );
}

export default Carrossel;
