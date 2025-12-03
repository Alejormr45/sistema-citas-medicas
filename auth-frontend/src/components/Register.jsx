import React, { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/register", { name, email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", res.data.email);

      toast.success("Registro exitoso 🎉");

      navigate("/dashboard");

    } catch (error) {
      toast.error("Error al registrar usuario ❌");
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <input
        type="text"
        className="w-full p-3 border rounded"
        placeholder="Nombre completo"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        className="w-full p-3 border rounded"
        placeholder="Correo electrónico"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full p-3 border rounded"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="w-full bg-green-600 text-white p-3 rounded">
        Registrarse
      </button>
    </form>
  );
}

export default Register;
