import React from 'react';
import '../Components/Rodape.css';

function Rodape() {
    return (
        <footer className="rodape">
            <p>&copy; 2025 CineVerse. Todos os direitos reservados.</p>
            <p>
                <a href="/sobre">Sobre</a> | <a href="/contato">Contato</a> | <a href="/privacidade">Política de Privacidade</a>
            </p>
        </footer>
    );
}

export default Rodape;
