import "./NavBar.css"
import logo from "../Imagens/netflix.png"
import { FaRegUser } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";

function NavBar() {

    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const u = localStorage.getItem('usuarioLogado');
        
        setUsuario(JSON.parse(u));
    },[]);

    return (

        <div className="nav-bar-pai">

            <div className="nav-bar-link">
                <Link to="/"  className="link">
                    <img src={logo} className="imagem"></img>
                </Link>                

                <Link to="/home"  className="link"  >
                    <span>Início</span>
                </Link>

                <Link to="/catalogo/series" className="link">
                    <span >Séries</span>
                </Link>

                <Link to="/catalogo/filmes" className="link">
                    <span >Filmes</span>
                </Link>

                <Link to="/catalogo/bombando" className="link">
                    <span >Bombando</span>
                </Link>
                <Link to="/catalogo/minhalista" className="link">
                    <span >Minha lista</span>
                </Link>

                <Link to='/trends' className="link">
                    <span >Tendências</span>
                </Link>
            </div>

            <div className="nav-bar-conta">
                <Link to="/perfil">
                  <img src={usuario?.avatarImage} className="foto-conta"></img>
                </Link>
                <Link to="/perfil" className="linkconta">
                    <span >{usuario?.apelidoName}</span>
                </Link>

            </div>

        </div>
    )
}

export default NavBar;