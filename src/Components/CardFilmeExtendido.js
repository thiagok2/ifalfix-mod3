import { Link } from "react-router-dom";
import "./CardFilmeExtendido.css";
import filmesService from "../Services/FilmesService";
import { FaComments, FaStar } from "react-icons/fa6";

function CardFilmeExtendido({ filme }) { // A prop 'key' é usada pelo React e não precisa ser passada para dentro

    if (!filme) {
        return null;
    }

    const handleAddClicado = () => {
        // Esta função será executada ANTES da navegação acontecer
        filmesService.addFilmeClicado(filme);
    }

    return (
        <Link 
            to={`/filme/${filme.tipo}/${filme.id}`} 
            className='container-filme' 
            onClick={handleAddClicado}
        >
            <div className='header-filme'>
            </div>

            <div className='img-container'>
                <img src={filme.fotoThumbnail} className='foto' alt={filme.titulo} />
            </div>

            <div className='filme-subtitulo'>
                <div className='subitem-header'>{filme.nota_avaliacao} <FaStar className='star'/></div>
                <div className='subitem-header faixa'>{filme.faixa_etaria}</div>
            </div>

            {filme.temporadas &&
                <div className='item-opcional'>{filme.temporadas}</div>
            }
            
            <div className='introducao'>
  {filme.sinopse.length > 165 ? filme.sinopse.slice(0, 165) + '...' : filme.sinopse}
            </div>


            
            <div className='footer-filme'>
                <div className='footer-item'> {filme.elenco}</div>
                <div className='footer-item'> {filme.genero}</div>
                <div className='footer-item'>Lançamento: {filme.ano_lancamento}</div>
                {filme.indicacoes_premios?.length > 0 &&
                    <div className='footer-item'>Indicações: {filme.indicacoes_premios}</div>
                }
            </div>
        </Link>
    );
}

export default CardFilmeExtendido;