import { filmes, filmes2, filmesNum } from "./FilmesMock.js";

class FilmesService {


    constructor() {
        this.todosFilmes = [...filmes, ...filmes2, ...filmesNum];
    }


    getById(id) {
        return this.todosFilmes.find(filme => filme.id === id) || null;
    }

    getRandomFilme() {
        const random = Math.floor(Math.random() * (this.todosFilmes.length));
        return this.todosFilmes[random];
    }

    getFilmesPorTipo(tipo) {
        return this.todosFilmes.filter(f => f.tipo === tipo);
    }

    getPorGenero(genero) {
        return this.todosFilmes.filter(f => f.genero.toLowerCase().includes(genero.toLowerCase()));
    }

    getFilmes() {
         return this.todosFilmes.filter(f => f.tipo === "f");
    }

    getSeries() {
        return this.todosFilmes.filter(f => f.tipo === "s");
    }

    addFilmeClicado(filme){
        const filmesClicadosStr = localStorage.getItem('filmesClicados');
        let filmesClicados =[];
        if(filmesClicadosStr){
             filmesClicados = JSON.parse(filmesClicadosStr);
        }

        const jaClicado = filmesClicados.some(f => f.id === filme.id);
        if(!jaClicado) {
             filmesClicados.push(filme);
             localStorage.setItem('filmesClicados', JSON.stringify(filmesClicados));

        }
    }

    getClicados() {
        const filmesClicadosStr = localStorage.getItem('filmesClicados');
        let filmesClicados =[];
        if(filmesClicadosStr){
             filmesClicados = JSON.parse(filmesClicadosStr);
        }

        return filmesClicados;
    }
}

export default new FilmesService();
