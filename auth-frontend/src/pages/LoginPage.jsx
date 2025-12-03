import React from "react";
import Login from "../components/Login";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Iniciar Sesión</h1>

        <Login />

        <div className="mt-4 text-center">
          <p>
            ¿No tienes cuenta?
            <Link to="/register" className="text-blue-600 font-semibold">
              {" "}
              Regístrate aquí
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
