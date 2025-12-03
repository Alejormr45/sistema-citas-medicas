import React, { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", { email, password });

      // GUARDAR TODO
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", res.data.email);

      toast.success("Login exitoso 🎉");

      navigate("/dashboard");

    } catch (error) {
      toast.error("Error al iniciar sesión ❌");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
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

      <button className="w-full bg-blue-600 text-white p-3 rounded">
        Iniciar sesión
      </button>
    </form>
  );
}

export default Login;
