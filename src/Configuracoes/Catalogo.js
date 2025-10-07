// Configuracoes/Catalogo.js
import FilmesServiceApi from "../Services/FilmesServiceApi";

export const carregarDadosCatalogo = async (tipo, setItemList, setCarregando, setErro) => {
  try {
    setCarregando(true); 
    setErro(null);

    const dados = tipo === 'filmes' 
      ? await FilmesServiceApi.getPopularMovies() 
      : await FilmesServiceApi.getPopularSeries();
    
    setItemList(dados);

  } catch (error) {
    setErro("Falha ao carregar os dados.");
  } finally {
    // Garante que a tela de loading tenha uma duração mínima para suavidade
    setTimeout(() => {
      setCarregando(false);
    }, 350); // 0.5 segundos
  }
};