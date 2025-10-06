import { useState, createElement as h } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Inicio.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Dados de Login:", { username, password });
    navigate("/");
  };


  return h(
    "div",
    { className: "container" },
    
    //  IMAGEM ADICIONADA AQUI, DENTRO DO RETURN E USANDO A SINTAXE 'h()'
    h("img", {
      src: "https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456",
      alt: "Logotipo-NETFLIX",
      className: "logo", // 
    }),

    /*  Imagem de fundo adicionada aqui 
    h("img", {
      src: "https://assets.nflxext.com/ffe/siteui/vlv3/d482944d-eab4-4a64-89c9-a07a508a6e42/web/BR-pt-20250929-TRIFECTA-perspective_f86e1617-a2fa-4e69-9251-41c164062b2e_large.jpg",
      alt: "Imagem-de-Fundo",
      className: "background-image", // Classe CSS para a imagem de fundo
    }),

    */
   
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