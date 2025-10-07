// Services/FilmesServiceApi.js

// Mock pode ser usado como fallback em caso de erro na API real
import FilmesServiceApiMock from './FilmesServiceApiMock';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY || 'f23c708f03660b2fc756a8d979dbe426';
const API_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

// Cache para armazenar a lista de gêneros e evitar chamadas repetidas
let genresCache = [];

const fetchTMDb = async (endpoint) => {
  const url = `${API_BASE_URL}${endpoint}?api_key=${API_KEY}&language=pt-BR`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erro na API do TMDb: ${response.status}`);
  }
  return response.json();
};

// Função auxiliar para converter IDs de gênero em nomes, usando o cache
const getGenreNamesByIds = (genreIds, allGenres) => {
  if (!allGenres || allGenres.length === 0 || !genreIds) {
    return '';
  }
  return genreIds
    .map((id) => {
      const genre = allGenres.find((g) => g.id === id);
      return genre ? genre.name : null;
    })
    .filter((name) => name !== null)
    .join(', ');
};

const FilmesServiceApi = {
  // Busca os gêneros UMA VEZ e armazena no cache para reutilização
  loadGenres: async () => {
    if (genresCache.length > 0) return genresCache; // Se já temos, não busca de novo
    try {
      const data = await fetchTMDb('/genre/movie/list');
      genresCache = data.genres;
      return genresCache;
    } catch (error) {
      console.error('Erro ao buscar gêneros:', error);
      return [];
    }
  },

  // Função interna para mapear e formatar os dados de um filme
  _mapMovieData: async (filme) => {
    const elenco = await FilmesServiceApi.getMovieCredits(filme.id);
    return {
      id: filme.id,
      titulo: filme.title,
      fotoThumbnail: filme.poster_path ? `${IMAGE_BASE_URL}w500${filme.poster_path}` : null,
      ano_lancamento: filme.release_date,
      tipo: 'movie',
      sinopse: filme.overview,
      genero: getGenreNamesByIds(filme.genre_ids, genresCache), // Usa o cache!
      elenco,
      curtidas: filme.vote_count,
      nota_avaliacao: filme.vote_average,
    };
  },
  
  // Função interna para mapear e formatar os dados de uma série
  _mapSerieData: async (serie) => {
     const elenco = await FilmesServiceApi.getSeriesCredits(serie.id);
     return {
        id: serie.id,
        titulo: serie.name,
        fotoThumbnail: serie.poster_path ? `${IMAGE_BASE_URL}w500${serie.poster_path}` : null,
        ano_lancamento: serie.first_air_date,
        tipo: 'series',
        sinopse: serie.overview,
        genero: getGenreNamesByIds(serie.genre_ids, genresCache), // Usa o cache!
        elenco,
        curtidas: serie.vote_count,
        nota_avaliacao: serie.vote_average,
     }
  },

  getPopularMovies: async () => {
    try {
      await FilmesServiceApi.loadGenres(); 
      const data = await fetchTMDb('/movie/popular');
      return Promise.all(data.results.map(FilmesServiceApi._mapMovieData));
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
      return FilmesServiceApiMock.getFilmesPorTipo('f');
    }
  },

  getPopularSeries: async () => {
    try {
        await FilmesServiceApi.loadGenres(); // Garante que os gêneros estão carregados
        const data = await fetchTMDb('/tv/popular');
        return Promise.all(data.results.map(FilmesServiceApi._mapSerieData));
    } catch (error) {
        console.error('Erro ao buscar séries populares:', error);
        return FilmesServiceApiMock.getFilmesPorTipo('s');
    }
  },
  
  // Função que você tentou criar, agora corrigida e com nome claro
  getTopRatedMovies: async () => {
    try {
      await FilmesServiceApi.loadGenres(); // Garante que os gêneros estão carregados
      const data = await fetchTMDb('/movie/top_rated');
      return Promise.all(data.results.map(FilmesServiceApi._mapMovieData));
    } catch (error) {
      console.error('Erro ao buscar filmes mais votados:', error);
      return [];
    }
  },

  getMovieCredits: async (movieId) => {
    try {
      const data = await fetchTMDb(`/movie/${movieId}/credits`);
      return data.cast.slice(0, 5).map((actor) => actor.name).join(', ');
    } catch (error) {
      console.error(`Erro ao buscar elenco do filme ${movieId}:`, error);
      return 'Elenco não disponível';
    }
  },

  getSeriesCredits: async (seriesId) => {
    try {
      const data = await fetchTMDb(`/tv/${seriesId}/credits`);
      return data.cast.slice(0, 5).map((actor) => actor.name).join(', ');
    } catch (error) {
      console.error(`Erro ao buscar elenco da série ${seriesId}:`, error);
      return 'Elenco não disponível';
    }
  },
};

export default FilmesServiceApi;