import { Routes, Route } from "react-router-dom";
import ProfilesPage from "./pages/ProfilesPage";
import PerfilPage from './pages/PerfilPage';
import FilmePage from "./pages/FilmePage"; 
import CatalogoPage from "./pages/CatalogoPage"; 
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TrendsPage from "./pages/TrendsPage";
import RegistroPage from "./pages/RegistroPage";

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            
            <Route path="/registro" element={<RegistroPage />} />

            <Route path="/SelecaoPerfil" element={<ProfilesPage />} />
            <Route path="/profiles" element={<ProfilesPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            
            <Route path="/home" element={<HomePage />} />
            <Route path="/filme" element={<FilmePage />} />
            <Route path="/filme/:tipo/:id" element={<FilmePage />} />
            <Route path="/trends"  element={<TrendsPage />} />
            
            <Route path="/catalogo" element={<CatalogoPage />} />
            <Route path="/catalogo/:tipo" element={<CatalogoPage />} />
            
            
        </Routes>
    );
}

export default MainRoutes;
