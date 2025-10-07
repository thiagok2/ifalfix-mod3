import comentariosService from "./ComentariosService.js";
import { filmes, filmes2, filmesNum } from "./FilmesMock.js";

class TrendsService {

    constructor() {
        this.todosFilmes = [...filmes, ...filmes2, ...filmesNum];
    }

    getPorComentarios(topN = 10) {  
        const filmes =  this.todosFilmes.sort((f1, f2) => f2.numero_comentarios - f1.numero_comentarios).slice(0, topN);

        const filmesComentados = filmes.map((f, idx) => {
            const comentarios = comentariosService.getByFilmeId(f.id);
            return ({...f,"a": 100, comentarios: comentarios });
        }).filter(f => f.comentarios.length > 0);

        return filmesComentados;
    }

    
}

export default new TrendsService();