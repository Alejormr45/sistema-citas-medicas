import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Dashboard() {
  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const id = localStorage.getItem("userId");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-white p-10 rounded-xl shadow-lg text-center w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-4">
          Bienvenido, {name} 👋
        </h1>

        <p className="text-gray-700 mb-2"><strong>ID:</strong> {id}</p>
        <p className="text-gray-700 mb-6"><strong>Email:</strong> {email}</p>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </motion.div>
  );
}

export default Dashboard;
