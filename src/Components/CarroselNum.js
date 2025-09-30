import { useRef } from "react";
import "./CarroselNum.css";
import CardFilme from "./CardFilme";

function CarroselNum({ listaNumerada }) {
  const scrollRef = useRef(null);
  let scrollInterval = null; //variável para guardar o intervalo

  const scrollByAmount = (amount) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  // clique unico
  const scrollLeft = () => scrollByAmount(-600);
  const scrollRight = () => scrollByAmount(600);

  // clicar para correr rápido
  const startScroll = (direction) => {
    if (scrollInterval) clearInterval(scrollInterval);
    scrollInterval = setInterval(() => {
      scrollByAmount(direction === "left" ? -50 : 50); //velocidade continua
    }, 50);//intervalo em ms (quanto menor, mais rápido)
  };

  const stopScroll = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
  };
  return (
    <div className="filmes">
      <span id="title">Brasil: top 10 em séries hoje</span>

      <div className="carrosel-container">
        <button className="btn-scroll left"
          onClick={scrollLeft}
          onMouseDown={() => startScroll("left")}
          onMouseUp={stopScroll}
          onMouseLeave={stopScroll}>
          ◀
        </button>

        <div className="carroselNum" ref={scrollRef}>
          {listaNumerada.map((filme, idx) => (
            <div className="conjuntoNum" key={filme.id}>
              <span className="numero">{idx + 1}</span>
              <CardFilme filme={filme} />
            </div>
          ))}
        </div>

        <button className="btn-scroll right"
          onClick={scrollRight}
          onMouseDown={() => startScroll("right")}
          onMouseUp={stopScroll}
          onMouseLeave={stopScroll}>
          ▶
        </button>
      </div>

      {/* <div className='carroselNum'>
              {
              listaNumerada.map((filme, idx) => (
                      <Link to={`/filme/${filme.id}`} class="link-num" key={idx}>
                        <div className='conjuntoNum'>
                            <span className='numero'>{i++}</span>
                            <img src={filme.fotoThumbnail} className="fotoNum" />
                        </div>
                      </Link>
                ))
              }
            </div> */}
    </div>
  );
}

export default CarroselNum;
