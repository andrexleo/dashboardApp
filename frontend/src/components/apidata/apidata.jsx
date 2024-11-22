import React, { useEffect, useState } from "react";

const ApiDataComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hacer la llamada a la API al montar el componente
    fetch("http://localhost:3000/api/data")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false); // Dejar de mostrar el estado de cargando
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []); // El segundo argumento [] asegura que esto solo ocurra al montar el componente

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Utilización por Sucursal</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.total}: {item.subtotal}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApiDataComponent;