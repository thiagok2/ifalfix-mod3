// Arquivo: src/Services/TrendsService.js

// Importe os serviços de API, não os mocks
import FilmesServiceApi from "./FilmesServiceApi.js";
import ComentariosService from "./ComentariosService.js"; // Supondo que você tenha este serviço separado

class TrendsService {

    /**
     * Busca os filmes mais populares, busca os comentários para cada um,
     * e retorna uma lista ordenada pelo número de comentários.
     * @param {number} topN - O número de filmes a serem retornados no final.
     * @returns {Promise<Array>} - Uma promessa que resolve para a lista de filmes com seus comentários.
     */
    async getPorComentarios(topN = 10) {
        try {
            // 1. Buscar uma lista base de filmes populares
            const filmesPopulares = await FilmesServiceApi.getPopularMovies();

            if (!filmesPopulares || filmesPopulares.length === 0) {
                return [];
            }

            // 2. Para cada filme, buscar a contagem de comentários (reviews)
            // Usamos Promise.all para fazer todas as buscas em paralelo e ganhar tempo
            const filmesComContagemDeComentarios = await Promise.all(
                filmesPopulares.map(async (filme) => {
                    // A função de comentários deve estar no seu FilmesServiceApi ou ComentariosService
                    const comentariosInfo = await FilmesServiceApi.getComentarios(filme.id, 'movie');
                    return {
                        ...filme, // Mantém os dados originais do filme
                        comentarios: comentariosInfo.results || [],
                        numero_comentarios: comentariosInfo.total_results || 0,
                    };
                })
            );

            // 3. Ordenar a lista final pelo número de comentários e pegar o top N
            const filmesOrdenados = filmesComContagemDeComentarios
                .sort((f1, f2) => f2.numero_comentarios - f1.numero_comentarios)
                .slice(0, topN);

            return filmesOrdenados;

        } catch (error) {
            console.error("Erro ao buscar filmes por comentários:", error);
            return []; // Retorna um array vazio em caso de erro
        }
    }
}

// Exporta uma única instância do serviço
export default new TrendsService();