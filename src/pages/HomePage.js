// Arquivo: src/Pages/HomePage.js

import React, { useState, useEffect } from 'react';
import FilmesServiceApi from '../Services/FilmesServiceApi';
import Carrossel from '../Components/Carrossel';
import CarrosselNum from '../Components/CarrosselNum';
import NavBar from '../Components/NavBar';
import FilmeDestaque from "../Components/FilmeDestaque";
import Rodape from '../Components/Rodape';

function HomePage() {
  // Seus estados continuam os mesmos
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [filmeDestaque, setFilmeDestaque] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // EFEITO 1: Responsável por buscar os dados da API APENAS UMA VEZ.
  useEffect(() => {
    const carregarTodosOsDados = async () => {
      try {
        const [movies, series, topRated] = await Promise.all([
          FilmesServiceApi.getPopularMovies(),
          FilmesServiceApi.getPopularSeries(),
          FilmesServiceApi.getTopRatedMovies(),
        ]);

        setPopularMovies(movies);
        setPopularSeries(series);
        setTopRatedMovies(topRated);

        // Define o PRIMEIRO filme de destaque aleatório
        if (movies && movies.length > 0) {
          const filmeAleatorio = movies[Math.floor(Math.random() * movies.length)];
          setFilmeDestaque(filmeAleatorio);
        }

      } catch (error) {
        console.error("Erro ao carregar dados para a página principal:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarTodosOsDados();
  }, []); // O array vazio [] garante que este efeito rode só na montagem.


  // NOVO EFEITO 2: Responsável por criar um TIMER que troca o filme em destaque
  useEffect(() => {
    // Se a lista de filmes ainda não carregou, não fazemos nada.
    if (popularMovies.length === 0) {
      return;
    }

    // Cria um intervalo que vai executar a função a cada 10 segundos.
    const intervalId = setInterval(() => {
      // Sorteia um novo filme da lista de populares
      const novoFilmeAleatorio = popularMovies[Math.floor(Math.random() * popularMovies.length)];
      // Atualiza o estado do filme em destaque com o novo filme
      setFilmeDestaque(novoFilmeAleatorio);
    }, 100000000);  

    // IMPORTANTE: Função de limpeza.
    // O React executa isso quando o componente "sai da tela".
    // Isso para o timer e evita erros e vazamentos de memória.
    return () => clearInterval(intervalId);

  }, [popularMovies]); // A dependência [popularMovies] garante que o timer só comece DEPOIS que os filmes forem carregados.


  // O restante do seu componente continua exatamente igual
  if (carregando) {
    return <div style={{  marginTop: "400px", color: "white", display: "flex",
       justifyContent: "center", alignItems: "center" , fontSize: "90px" }}>Carregando...</div>;
  }

  return (
    <div className="home-page">
      <NavBar />

     {filmeDestaque && <FilmeDestaque filme={filmeDestaque} />}

      {/* Carrossel de Filmes Populares */}
      {popularMovies.length > 0 && (
        <Carrossel 
          descricao="Filmes Populares" 
          listadeFilmes={popularMovies} 
        />
      )}

      {/* Carrossel de Séries Populares */}
      {popularSeries.length > 0 && (
        <Carrossel 
          descricao="Séries Populares" 
          listadeFilmes={popularSeries}
        />
      )}

      {/* Carrossel de Filmes Mais Votados */}
      {topRatedMovies.length > 0 && (
        <CarrosselNum
          listaNumerada={topRatedMovies}
        /> 
      )}
          
    
    <Rodape />
      
    </div>
  );
}

export default HomePage;