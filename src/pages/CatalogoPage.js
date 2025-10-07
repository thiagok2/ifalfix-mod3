import './CatalogoPage.css'

import NavBar from '../Components/NavBar';
import { Link, useParams } from 'react-router-dom'
import filmesService from '../Services/FilmesService';
import { FaComments } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import CardFilmeExtendido from '../Components/CardFilmeExtendido';


function CatalogoPage() {

    const { tipo } = useParams();
    let paramTipo = tipo === "series" ? "s" : "f";

    const filmeList = filmesService.getFilmesPorTipo(paramTipo);

    return (
        <div className='container'>
            <div className='navbar'>
                <NavBar />
            </div>

            <div className='containers-catalogo'>
                {
                    filmeList.map((filme, idx) => 
                        <CardFilmeExtendido key={idx} filme={filme} />
                    )
                }

            </div>

        </div>
    )
}

export default CatalogoPage;
