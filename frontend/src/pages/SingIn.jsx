// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Alert, Button, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {
  // Estados para controlar los valores de los inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Maneja el cambio en los inputs
  const handleChange = (e) => {
    
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      return setErrorMessage("Todos los campos son obligatorios");
    }
    try {
      setLoading(true);
      setErrorMessage("null");
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      console.log(data); // Para depurar la respuesta
      setLoading(false);
      if (res.ok){
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Crear Cuenta
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="Tu nombre"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="Tu contraseña"
              required
            />
          </div>

          <Button
            type="submit"
            gradientDuoTone="redToYellow"
            className="items-center w-full h-12"
            disabled={loading}
          >
            {
              loading ? (
                <>
                <Spinner size="sm" />
                <span className="pl-3">Registrando...</span>
                </>
              
              ) : 'Registrarse'
            }
          </Button>
        </form>
        <div className="mt-4">
          <span>¿Ya tienes una cuenta? </span>
          <Link
            to="/login"
            className="text-green-600 hover:text-green-800 duration-200 text-sm"
          >
            Iniciar Sesión
          </Link>
        </div>
        {errorMessage && ( // La alerta solo aparece si errorMessage tiene un valor
          <Alert className="mt-4" color="failure">
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Signup;
