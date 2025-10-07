// Arquivo: Pages/CatalogoPage.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";
import CardFilme from "../Components/CardFilmesApi"; // <-- Usa o nosso novo CardFilme
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

  if (erro) {
    return <div >Erro: {erro}</div>;
  }

  return (
    <div className="container">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="containers-catalogo">
        {itemList.length > 0 ? (
          itemList.map((filme) => (
            <CardFilme key={filme.id} filme={filme} />
          ))
        ) : (
          <p style={{ color: 'white' }}>Nenhum item encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default CatalogoPage;