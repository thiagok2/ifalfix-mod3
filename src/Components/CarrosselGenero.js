import './CarrosselGenero.css'
import FilmesServiceApi from '../Services/FilmesServiceApi'
import { useEffect, useState } from 'react'

function CarrosselGenero ({handleFiltroGenero}){

    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        const fetchGeneros = async () => {
            try {
                const result = await FilmesServiceApi.getGeneros();
                setGeneros(result);

            } catch (error) {
                console.error("Erro ao buscar gêneros:", error);
            }
        };

        fetchGeneros();
    }, []);

    return(
        <div className='container-generos'>
            {generos.map((genero) => (
                <div key={genero.id} className='botao-genero' onClick={() => handleFiltroGenero(genero)}>
                    {genero.name}
                </div>
            ))}
        </div>
    )

}

export default CarrosselGenero