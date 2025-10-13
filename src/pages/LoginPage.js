import "./LoginPage.css";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Dados de Login:", { username, password });
    navigate("/profiles");
  };

  return (
    <div className="container-login">
      {/* Logotipo Netflix */}
      <img
        src="https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456"
        alt="Logotipo-NETFLIX"
        className="imagem-logo"
      />

      {/* 
      Imagem de fundo (caso queira ativar)
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/d482944d-eab4-4a64-89c9-a07a508a6e42/web/BR-pt-20250929-TRIFECTA-perspective_f86e1617-a2fa-4e69-9251-41c164062b2e_large.jpg"
        alt="Imagem-de-Fundo"
        className="background-image"
      />
      */}

      <form onSubmit={handleSubmit}>
        <h1>Entrar</h1>

        {/* Campo de E-mail */}
        <div className="input-field">
          <input
            type="text"
            placeholder="E-mail"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>

        {/* Campo de Senha */}
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        {/* Checkbox Lembrar */}
        <div className="recall-forget">
          <label>
            <input type="checkbox" />
            Lembre de mim
          </label>
        </div>

        {/* Botão Entrar */}
        <button type="submit">Entrar</button>

        {/* Link para registro */}
        <div className="signup-link">
          <p>
            Não tem uma conta? <Link to="/registro">Criar conta</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
