import { useState, createElement as h } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // <-- adicionar useNavigate
import "./Inicio.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // <-- criar função de navegação

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Dados de Login:", { username, password });


    // Se login for bem-sucedido, redireciona:
    navigate("/"); // <-- redirecionamento programático
  };

  return h(
    "div",
    { className: "container" },
    h(
      "form",
      { onSubmit: handleSubmit },
      h("h1", null, "Entrar"),

      h(
        "div",
        { className: "input-field" },
        h("input", {
          type: "text",
          placeholder: "E-mail",
          required: true,
          value: username,
          onChange: (e) => setUsername(e.target.value),
        }),
        h(FaUser, { className: "icon" })
      ),

      h(
        "div",
        { className: "input-field" },
        h("input", {
          type: "password",
          placeholder: "Senha",
          required: true,
          value: password,
          onChange: (e) => setPassword(e.target.value),
        }),
        h(FaLock, { className: "icon" })
      ),

      h(
        "div",
        { className: "recall-forget" },
        h(
          "label",
          null,
          h("input", { type: "checkbox" }),
          "Lembre de mim"
        )
      ),

      // Botão de submit normal
      h("button", { type: "submit" }, "Entrar"),

      h(
        "div",
        { className: "signup-link" },
        h(
          "p",
          null,
          "Não tem uma conta? ",
          h(Link, { to: "/Registro" }, "Registrar")
        )
      )
    )
  );
};

export default Login;
