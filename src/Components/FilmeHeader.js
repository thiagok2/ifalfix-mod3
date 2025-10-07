import './FilmeHeader.css'
import { IoAddCircleOutline } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { Link } from 'react-router-dom'


function FilmeHeader({ filme }) {
    return (
        <div className='PaiHeader'>
            <div className='infoFilme'>

                <div className='NomeFilme'>{filme.titulo}</div>

                <div className='Tempo'>{filme.duracao}</div>

                <div className='caracteristicas'>
                 <div className='lancamento'>{filme.ano_lancamento}</div>
                <div className='temporadas'>{filme.temporadas}</div>
                    <span className='hd-texto'>HD</span>
                    </div>


                <div className='classificacao'>
                    <span className={ "faixa-etaria-icon " + (filme.faixa_etaria >= "16" ? "icon-red":"icon-green")}>
                        {filme.faixa_etaria}+
                    </span>

                    <div className='sobre'>{filme.genero}</div>
                </div>

             
               
                

                <div className='descricao'>
                    <div className='texto'>
                        {filme.sinopse}
                    </div>

                    <div className="atores-container">{filme.elenco}</div>
                 
                     <div className='Botoes-detalhes'>
        
                          <span className='estilo-botao'><FaPlay color ="000000" className='Icone'/> Assistir</span>

                           <span className='estilo-lista'> <IoAddCircleOutline color ="000000" className='Lista'/>Minha Lista </span>
                     </div>

                

                    <div className='card-menu'>
                        <Link className='cor-visao'>
                            COMENTÁRIOS
                        </Link>
                        <Link className='cor-visao' to={'/catalogo'}> 
                            TITULOS SEMELHANTES 
                        </Link>
                        <Link className='cor-visao'>
                            DETALHES
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FilmeHeader;
