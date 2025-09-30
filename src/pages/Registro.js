import { useState, createElement as h } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Registro.css";

const Register = () => {
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

  return h(
    "div",
    { className: "register-container" },
    h(
      "form",
      { onSubmit: handleSubmit },
      h("h1", null, "Crie sua conta"),

      h(
        "div",
        { className: "input-field" },
        h("input", {
          type: "text",
          placeholder: "Nome completo",
          required: true,
          value: name,
          onChange: (e) => setName(e.target.value),
        }),
        h(FaUser, { className: "icon" })
      ),

      h(
        "div",
        { className: "input-field" },
        h("input", {
          type: "email",
          placeholder: "E-mail",
          required: true,
          value: email,
          onChange: (e) => setEmail(e.target.value),
        }),
        h(FaEnvelope, { className: "icon" })
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
        { className: "input-field" },
        h("input", {
          type: "password",
          placeholder: "Confirme a senha",
          required: true,
          value: confirmPassword,
          onChange: (e) => setConfirmPassword(e.target.value),
        }),
        h(FaLock, { className: "icon" })
      ),

      h("button", { type: "submit" }, "Registrar"),

      h(
        "div",
        { className: "login-link" },
        h(
          "p",
          null,
          "Já tem uma conta? ",
          h(Link, { to: "/Inicio" }, "Login")
        )
      )
    )
  );
};

export default Register;
