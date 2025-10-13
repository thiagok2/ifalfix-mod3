import './CatalogoPage.css'

import React, { useState, useEffect } from "react";

import NavBar from '../Components/NavBar';
import { useParams } from 'react-router-dom'
import CardFilmeExtendido from '../Components/CardFilmeExtendido';
import { carregarDadosCatalogo } from "../Configuracoes/Catalogo";
import "./CatalogoPage.css";

function CatalogoPage() {
  const { tipo } = useParams();
  const [itemList, setItemList] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    carregarDadosCatalogo(tipo, setItemList, setCarregando, setErro);
  }, [tipo]);

  if (carregando) {
    return <div >Carregando...</div>;
  }

    return (
        
        <div className='container'>
            <div className='navbar'>
                <NavBar />
            </div>

             
            <div className='containers-catalogo'>
                {
                    itemList.map((filme, idx) => 
                        <CardFilmeExtendido key={idx} filme={filme} />
                    )
                }

            </div>

        </div>
    )
}

export default CatalogoPage;