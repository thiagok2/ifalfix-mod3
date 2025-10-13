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

//-----------------------------------------

const mapData = (stream, genres, tipo) => ({
  id: stream.id,
  titulo: tipo === 'movie' ? stream.title : stream.name,
  fotoThumbnail: stream.poster_path ? `${IMAGE_BASE_URL}w500${stream.poster_path}` : null,
  ano_lancamento: tipo === 'movie' ? stream.release_date : stream.first_air_date,
  tipo: tipo,
  sinopse: stream.overview,
  genero: getGenreNamesByIds(stream.genre_ids, genres),
  elenco: '',
  curtidas: stream.vote_count,
  nota_avaliacao: stream.vote_average,
});


const FilmesServiceApi = {
  // Carregar os generos
  preloadGenres: async () => GenreCache.preloadBoth(),

  getPopularMovies: async () => {
    try {
      const genres = await GenreCache.get('movie');
      const data = await fetchTMDb('/movie/popular');
      return data.results.map((f) => mapData(f, genres, 'movie'));
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
      return [];
    }
  },

  getPopularSeries: async () => {
    try {
      const genres = await GenreCache.get('tv');
      const data = await fetchTMDb('/tv/popular');
      return data.results.map((s) => mapData(s, genres, 'tv'));
    } catch (error) {
      console.error('Erro ao buscar séries populares:', error);
      return [];
    }
  },

  getTopRatedMovies: async () => {
    try {
      const genres = await GenreCache.get('movie');
      const data = await fetchTMDb('/movie/top_rated');
      return data.results.map((f) => mapData(f, genres, 'movie'));
    } catch (error) {
      console.error('Erro ao buscar filmes mais votados:', error);
      return [];
    }
  },

  getById: async (id, tipo) => {
    try {
      // Busca os detalhes do filme
      const details = await fetchTMDb(`/${tipo}/${id}`);
      if (!details) return null;

      // Busca os gêneros para mapear os nomes
      const allGenres = await GenreCache.get(tipo);

      return mapData(details, allGenres, tipo);
    } catch (error) {
      console.error(`Erro ao buscar detalhes(${tipo}) ${id}`, error);
      return null;
    }
  },

  
};

export default FilmesServiceApi;
