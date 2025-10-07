// Arquivo: src/components/FilmeDestaque.js

import "./FilmeDestaque.css";
import { CiCircleInfo } from "react-icons/ci";
import { SiNetflix } from "react-icons/si";
import { Link } from "react-router-dom";
import filmesService from "../Services/FilmesService";

// Componente para renderizar a classificação de idade
const Classificacao = ({ paraAdultos }) => {
    // CORRIGIDO: Exibe a idade correta (18 ou L) com base no dado da API (true/false)
    const idade = paraAdultos ? "18" : "L";
    const cor = paraAdultos ? '#d40f0f' : '#29a019';

    const estilo = {
        border: `2px solid ${cor}`,
        padding: '5px 10px',
        borderRadius: '5px',
        backgroundColor: 'rgba(0,0,0,0.6)',
        color: cor,
        fontSize: '20px',
        fontWeight: 'bold',
    };

    return <span style={estilo}>{idade}</span>;
}

function FilmeDestaque({ filme }) {
    // Adiciona uma verificação para evitar erros se 'filme' ainda não carregou
    if (!filme) {
        return null;
    }

    const handleAddInteresse = () => {
        filmesService.addFilmeClicado(filme);
    }
    
    // Pega a imagem de fundo (backdrop) ou o poster (thumbnail) se a primeira não existir
    const imagemDeFundo = filme.imagem_fundo || filme.fotoThumbnail;

    return (
        // ESTRUTURA CORRIGIDA: A div principal agora tem a imagem de fundo
        // E todo o conteúdo está DENTRO dela.
        <section className="filme-destaque" style={{ backgroundImage: `url(${imagemDeFundo})` }}>
            <div className="destaque-vertical">
                <div className="destaque-horizontal">
                    
                    {/* Seu layout de informações */}
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
                            {/* CORRIGIDO: O link agora leva para a página específica do filme */}
                            <Link to={`/filme/${filme.id}`} className="mais-informacoes" onClick={handleAddInteresse}>
                                <CiCircleInfo className="ciculo" />
                                <span className="mais"> Mais informações</span>
                            </Link>
                            <Classificacao paraAdultos={filme.faixa_etaria}/>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default FilmeDestaque;