const API_KEY = process.env.REACT_APP_TMDB_API_KEY || 'f23c708f03660b2fc756a8d979dbe426';
const API_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

const fetchTMDb = async (endpoint, params = {}) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  const sp = url.searchParams;
  sp.set('api_key', API_KEY);
  sp.set('language', 'pt-BR');
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) sp.set(k, String(v));
  });

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error(`Erro na API do TMDb: ${response.status}`);
  return response.json();
};

// ---------- Cache de gêneros ----------
// Mantém caches separados para 'movie' e 'tv' e de-duplica chamadas concorrentes.
const GenreCache = (() => {
  const memory = { movie: null, tv: null }; // { movie: Genre[], tv: Genre[] }
  const pending = { movie: null, tv: null }; // Promises em voo

  const fetchGenres = async (type) => {
    const endpoint = type === 'tv' ? '/genre/tv/list' : '/genre/movie/list';
    const data = await fetchTMDb(endpoint);
    return Array.isArray(data?.genres) ? data.genres : [];
  };

  // Retorna array de gêneros para o tipo; de-duplica chamadas simultâneas
  const get = async (type) => {
    if (Array.isArray(memory[type]) && memory[type].length > 0) {
      return memory[type];
    }
    if (pending[type]) return pending[type];

    pending[type] = (async () => {
      try {
        const genres = await fetchGenres(type);
        memory[type] = genres;
        return genres;
      } finally {
        pending[type] = null;
      }
    })();

    return pending[type];
  };

  const preloadBoth = async () => {
    await Promise.all([get('movie'), get('tv')]);
  };

  return { get, preloadBoth };
})();

// ---------- helpers de transformação ----------
const getGenreNamesByIds = (genreIds, allGenres) => {
  if (!Array.isArray(genreIds) || !Array.isArray(allGenres) || allGenres.length === 0) return '';
  const byId = new Map(allGenres.map((g) => [g.id, g.name]));
  return genreIds.map((id) => byId.get(id)).filter(Boolean).join(', ');
};

const mapMovieData = (filme, genres) => ({
  id: filme.id,
  titulo: filme.title,
  fotoThumbnail: filme.poster_path ? `${IMAGE_BASE_URL}w500${filme.poster_path}` : null,
  ano_lancamento: filme.release_date,
  tipo: 'movie',
  sinopse: filme.overview,
  genero: getGenreNamesByIds(filme.genre_ids, genres),
  elenco: '',
  curtidas: filme.vote_count,
  nota_avaliacao: filme.vote_average,
});

const mapSerieData = (serie, genres) => ({
  id: serie.id,
  titulo: serie.name,
  fotoThumbnail: serie.poster_path ? `${IMAGE_BASE_URL}w500${serie.poster_path}` : null,
  ano_lancamento: serie.first_air_date,
  tipo: 'series',
  sinopse: serie.overview,
  genero: getGenreNamesByIds(serie.genre_ids, genres),
  elenco: '',
  curtidas: serie.vote_count,
  nota_avaliacao: serie.vote_average,
});


const FilmesServiceApi = {
  // Carregar os generos
  preloadGenres: async () => GenreCache.preloadBoth(),

  getPopularMovies: async () => {
    try {
      const genres = await GenreCache.get('movie');
      const data = await fetchTMDb('/movie/popular');
      return data.results.map((f) => mapMovieData(f, genres));
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
      return [];
    }
  },

  getPopularSeries: async () => {
    try {
      const genres = await GenreCache.get('tv');
      const data = await fetchTMDb('/tv/popular');
      return data.results.map((s) => mapSerieData(s, genres));
    } catch (error) {
      console.error('Erro ao buscar séries populares:', error);
      return [];
    }
  },

  getTopRatedMovies: async () => {
    try {
      const genres = await GenreCache.get('movie');
      const data = await fetchTMDb('/movie/top_rated');
      return data.results.map((f) => mapMovieData(f, genres));
    } catch (error) {
      console.error('Erro ao buscar filmes mais votados:', error);
      return [];
    }
  },

  getMovieCredits: async (movieId) => {
    try {
      const data = await fetchTMDb(`/movie/${movieId}/credits`);
      return data.cast.slice(0, 5).map((a) => a.name).join(', ');
    } catch (error) {
      console.error(`Erro ao buscar elenco do filme ${movieId}:`, error);
      return 'Elenco não disponível';
    }
  },

  getSeriesCredits: async (seriesId) => {
    try {
      const data = await fetchTMDb(`/tv/${seriesId}/credits`);
      return data.cast.slice(0, 5).map((a) => a.name).join(', ');
    } catch (error) {
      console.error(`Erro ao buscar elenco da série ${seriesId}:`, error);
      return 'Elenco não disponível';
    }
  },
    getMovieById: async (movieId) => {
    try {
      // Busca os detalhes do filme
      const filmeDetails = await fetchTMDb(`/movie/${movieId}`);
      if (!filmeDetails) return null;

      // Busca os gêneros para mapear os nomes
      const allGenres = await GenreCache.get('movie');
      
      // Mapeia os dados para o formato que seu componente espera
      // (Você pode adaptar este mapeamento conforme sua necessidade)
      return {
        id: filmeDetails.id,
        titulo: filmeDetails.title,
        fotoThumbnail: filmeDetails.poster_path ? `${IMAGE_BASE_URL}w500${filmeDetails.poster_path}` : null,
        fotoBanner: filmeDetails.backdrop_path ? `${IMAGE_BASE_URL}original${filmeDetails.backdrop_path}` : null,
        ano_lancamento: filmeDetails.release_date?.split('-')[0], // Pega só o ano
        tipo: 'movie',
        sinopse: filmeDetails.overview,
        genero: filmeDetails.genres.map(g => g.name).join(', '),
        nota_avaliacao: filmeDetails.vote_average.toFixed(1), // Formata para uma casa decimal
        // Adicione outros campos que precisar aqui
      };
    } catch (error) {
      console.error(`Erro ao buscar detalhes do filme ${movieId}:`, error);
      return null;
    }
  },
  
};

export default FilmesServiceApi;
