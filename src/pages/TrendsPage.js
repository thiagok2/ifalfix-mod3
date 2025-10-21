// Arquivo: src/Pages/TrendsPage.js

import React, { useState, useEffect } from 'react'; // 1. Importar os hooks
import './TrendsPage.css';
import trendsService from '../Services/TrendsService';
import NavBar from '../Components/NavBar';

import CardFilmeExtendido from '../Components/CardFilmeExtendido';
import ComentariosContainer from '../Components/ComentariosContainer';

function TrendsPage() {
    // 2. Criar estados para guardar os filmes e controlar o carregamento
    const [topFilmes, setTopFilmes] = useState([]);
    const [carregando, setCarregando] = useState(true);

    // 3. Usar useEffect para buscar os dados quando o componente for montado
    useEffect(() => {
        // Criamos uma função async dentro do useEffect para poder usar 'await'
        const buscarDados = async () => {
            try {
                // Chama nosso serviço e espera a resposta
                const filmes = await trendsService.getPorComentarios(10);
                setTopFilmes(filmes); // Guarda os filmes no estado
            } catch (error) {
                console.error("Erro na página Trends:", error);
            } finally {
                // Independentemente de sucesso ou erro, paramos o carregamento
                setCarregando(false);
            }
        };

        buscarDados(); // Executa a função
    }, []); // O array vazio [] garante que isso só roda uma vez

    // 4. Adicionar um feedback de carregamento para o usuário
    if (carregando) {
        return (
            <div className='container'>
                <div className='navbar'><NavBar /></div>
                <div className='loading-message'>Carregando filmes mais comentados...</div>
            </div>
        );
    }

    // 5. Renderizar o conteúdo somente após o carregamento
    return (
        <div className='container'>
            <div className='navbar'>
                <NavBar />
            </div>
            <div className='container-trends'>
                {
                    topFilmes.map((filme) => 
                        // CORREÇÃO: Usar um ID único do filme para a 'key', não o índice
                        <div className='container-filmeComentado' key={filme.id}> 
                            <div className='filme-box'>
                                <CardFilmeExtendido filme={filme} />
                            </div>
                            <div className='comentarios-box'>
                                {/* Passa a lista de comentários que já buscamos */}
                                <ComentariosContainer 
                                    comentarios={filme.comentarios} 
                                    nota_avaliacao={filme.nota_avaliacao}
                                    showAvaliacao={false} 
                                />
                            </div>
                        </div>     
                    )
                }
            </div>
        </div>
    );
}

export default TrendsPage;