import './TrendsPage.css';
import trendsService from '../Services/TrendsService';
import NavBar from '../Components/NavBar';

import CardFilmeExtendido from '../Components/CardFilmeExtendido';
import ComentariosContainer from '../Components/ComentariosContainer';
import CardFilme from '../Components/CardFilme';

function TrendsPage() {

    const topFilmes = trendsService.getPorComentarios(10);

    return (
        <div className='container'>
            <div className='navbar'>
                <NavBar />
            </div>
            <div className='container-trends'>
                {
                    topFilmes.map((filme, idx) => 
                        <div className='container-filmeComentado'>
                            <div className='filme-box'>
                                <CardFilmeExtendido key={idx} filme={filme} />
                                {/* <CardFilme filme={filme} expandido={true} key={idx} /> */}
                            </div>
                            <div className='comentarios-box'>
                                <ComentariosContainer filme={filme} showAvaliacao={false}/>
                            </div>
                        </div>
                            
                    )
                }
            </div>
        </div>
    );
}

export default TrendsPage;