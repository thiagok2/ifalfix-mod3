// Configuracoes/Catalogo.js
import FilmesServiceApi from "../Services/FilmesServiceApi";

export const carregarDadosCatalogo = async (tipo, setItemList, setCarregando, setErro, genero) => {
  try {
    setCarregando(true); 
    setErro(null);
    let dados = [];
    
    if(genero) {
      console.log("Carregando dados do gênero:", genero);

      const type = tipo == 'filmes' ? 'movie' : 'tv';
      dados = await FilmesServiceApi.getByGenero(genero.id, type);
    
    } else {
      dados = tipo === 'filmes' ? 
      await FilmesServiceApi.getPopularMovies() 
      : await FilmesServiceApi.getPopularSeries();
    }
    
    
    setItemList(dados);

  } catch (error) {
    setErro("Falha ao carregar os dados."+ error?.message);
    console.log(error);
  } finally {
    // Garante que a tela de loading tenha uma duração mínima para suavidade
    setTimeout(() => {
      setCarregando(false);
    }, 350); // 0.5 segundos
  }
};