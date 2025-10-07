// arquivo: src/components/FilmeDestaque.js

import "./FilmeDestaque.css";
import { CiCircleInfo } from "react-icons/ci";
import { SiNetflix } from "react-icons/si";
import { Link } from "react-router-dom";
import filmesService from "../Services/FilmesService";

// Componente para renderizar a classificação de idade
const Classificacao = ({ idade }) => {
    const estilo = {
        border: '2px solid white',
        padding: '5px',
        borderRadius: '5px',
        backgroundColor: 'rgba(0,0,0,0.5)',
        fontSize: '20px',
    };

    return <span style={estilo}>{idade}</span>;
}


function FilmeDestaque({ filme }) {


    const handleAddInteresse = () => {
        filmesService.addFilmeClicado(filme);
    }

    return (
        
        <div className="detInical">
            <div className="filme-card">  

                <div className="logoNet">
                    <SiNetflix className="logo" />
                    <span className="nomeFilm">F I L M E</span>
                </div>

                <div className="title">
                    <span className="nomeFilme1"> {filme.titulo} </span>
                    <span className="nomeFilme2"> {filme.genero} </span>
                </div>

                <div className="info-pai">
                    <div className="option">
                        <Link to={`/filme/${filme.id}`} className="mais-informacoes" onClick={handleAddInteresse}>
                            <CiCircleInfo className="ciculo" />
                            <span className="mais"> Mais informações</span>
                        </Link>
                        <Classificacao idade={filme.faixa_etaria}/>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default FilmeDestaque;