// FilmesServiceApiMock.js (sem alterações)
const mockMovies = [
  {
    id: 1,
    titulo: 'Filme Mock',
    fotoThumbnail: 'https://via.placeholder.com/500',
    ano_lancamento: '2023-01-01',
    tipo: 'movie',
    faixa_etaria: false,
    sinopse: 'Um filme de teste.',
    genero: 'Ação, Aventura',
    nota_avaliacao: 7.5,
    curtidas: 100,
    elenco: 'Ator 1, Ator 2',
    numero_comentarios: 5,
  },
  // ... outros filmes
];

const mockSeries = [
  {
    id: 2,
    titulo: 'Série Mock',
    fotoThumbnail: 'https://via.placeholder.com/500',
    ano_lancamento: '2022-01-01',
    tipo: 'series',
    faixa_etaria: false,
    sinopse: 'Uma série de teste.',
    genero: 'Drama, Mistério',
    nota_avaliacao: 8.0,
    curtidas: 150,
    elenco: 'Ator 3, Ator 4',
    numero_comentarios: 10,
    temporadas: '2 temporadas',
  },
  // ... outras séries
];

const FilmesServiceApiMock = {
  getFilmesPorTipo: (tipo) => {
    return tipo === 's' ? mockSeries : mockMovies;
  },
};

export default FilmesServiceApiMock;