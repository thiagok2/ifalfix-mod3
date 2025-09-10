import "./SelecaoPerfil.css";
import BotaoVazado from "./BotaoVazado";
import CardPerfil from "./CardPerfil";


function SelecaoPerfil ({listaDeUsuarios}) {

    return(
        
        
        <div className="selecao-perfil">
            <h2>
                Quem está assistindo? 
            </h2>

            <div className="janelas">

            {
                listaDeUsuarios.map(user => 
                    <CardPerfil key={user.id} usuario={user} />
                )
            }

            </div>

            <BotaoVazado />

        </div>

    );
}

export default SelecaoPerfil;