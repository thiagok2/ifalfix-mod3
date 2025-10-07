import "./RegistroPage.css";
import { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

function RegistroPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    console.log("Dados de Registro:", { name, email, password });
  };

  return (
    <div className="registro-container">
      <form onSubmit={handleSubmit}>
        <h1>Crie sua conta</h1>

        {/* Campo Nome completo */}
        <div className="input-field">
          <input
            type="text"
            placeholder="Nome completo"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FaUser className="icon" />
        </div>

        {/* Campo E-mail */}
        <div className="input-field">
          <input
            type="email"
            placeholder="E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaEnvelope className="icon" />
        </div>

        {/* Campo Senha */}
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

        {/* Campo Confirmar Senha */}
        <div className="input-field">
          <input
            type="password"
            placeholder="Confirme a senha"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        {/* Botão Registrar */}
        <button type="submit">Registrar</button>

        {/* Link para Login */}
        <div className="login-link">
          <p>
            Já tem uma conta? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegistroPage;
