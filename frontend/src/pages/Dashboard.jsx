import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "flowbite-react";

const Dashboard = () => {
  const templates = [
    { id: 1, name: "Plantilla Clásica", description: "Un diseño elegante y sencillo." },
    { id: 2, name: "Plantilla Moderna", description: "Un diseño moderno con animaciones." },
    { id: 3, name: "Plantilla Vintage", description: "Un diseño clásico con estilo retro." },
  ];

  const events = [
    { id: 1, title: "Boda de Ana y Luis", date: "2024-12-15", invitations: 120 },
    { id: 2, title: "Cumpleaños de Pedro", date: "2024-08-05", invitations: 50 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 p-4 text-white shadow-lg">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Gestión de eventos e invitaciones</p>
      </header>

      <div className="container mx-auto p-6 space-y-8">
        {/* Gestión de eventos */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Tus Eventos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <Card key={event.id}>
                <h3 className="text-lg font-bold">{event.title}</h3>
                <p>Fecha: {event.date}</p>
                <p>Invitaciones: {event.invitations}</p>
                <Link to={`/event/${event.id}`}>
                  <Button gradientDuoTone="greenToBlue" className="mt-4">
                    Ver Detalles
                  </Button>
                </Link>
              </Card>
            ))}
            <Card>
              <h3 className="text-lg font-bold">Crear Nuevo Evento</h3>
              <p>Agrega un evento para comenzar a enviar invitaciones.</p>
              <Link to="/event/create">
                <Button gradientDuoTone="purpleToPink" className="mt-4">
                  Crear Evento
                </Button>
              </Link>
            </Card>
          </div>
        </section>

        {/* Plantillas */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Plantillas Disponibles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <h3 className="text-lg font-bold">{template.name}</h3>
                <p>{template.description}</p>
                <Link to={`/template/${template.id}`}>
                  <Button gradientDuoTone="cyanToBlue" className="mt-4">
                    Usar Plantilla
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* Herramientas de personalización */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Herramientas de Personalización</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <h3 className="text-lg font-bold">Editor Visual</h3>
              <p>Personaliza tus invitaciones con herramientas avanzadas.</p>
              <Link to="/editor">
                <Button gradientDuoTone="redToYellow" className="mt-4">
                  Ir al Editor
                </Button>
              </Link>
            </Card>
            <Card>
              <h3 className="text-lg font-bold">Gestión de Invitados</h3>
              <p>Administra las listas de invitados para tus eventos.</p>
              <Link to="/guests">
                <Button gradientDuoTone="greenToBlue" className="mt-4">
                  Administrar Invitados
                </Button>
              </Link>
            </Card>
            <Card>
              <h3 className="text-lg font-bold">Análisis</h3>
              <p>Obtén estadísticas sobre la confirmación de asistencia y más.</p>
              <Link to="/analytics">
                <Button gradientDuoTone="purpleToPink" className="mt-4">
                  Ver Análisis
                </Button>
              </Link>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;








/*import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sliderbar from "../components/sliderbar/Sliderbar";
import Header from "../components/header/Header";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-row bg-white h-screen w-screen left-0 gap-2">
      {/* Pasar el valor correcto de isSidebarOpen }
      
      <Sliderbar isSidebarOpen={isSidebarOpen} />
      
      <div className="flex flex-col flex-1">
        {/* Pasar toggleSidebar como prop }
        <Header toggleSidebar={toggleSidebar} />
        <div className=" flex-1 p-4 min-h-0 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;*/
/*
import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { Button } from "flowbite-react";

const VisualEditor = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  // Agregar nuevos elementos al editor
  const addElement = (type) => {
    const newElement = {
      id: `element-${elements.length + 1}`,
      type,
      x: 50,
      y: 50,
      width: type === "text" ? 200 : 100,
      height: type === "text" ? 50 : 100,
      content: type === "text" ? "Nuevo texto" : "https://via.placeholder.com/150",
    };
    setElements([...elements, newElement]);
  };

  // Actualizar posición y tamaño de un elemento
  const updateElement = (id, newProps) => {
    setElements((prevElements) =>
      prevElements.map((el) => (el.id === id ? { ...el, ...newProps } : el))
    );
  };

  // Manejar cambios en el texto
  const handleTextChange = (e) => {
    if (selectedElement) {
      updateElement(selectedElement.id, { content: e.target.value });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      
      <div className="flex items-center gap-4 p-4 bg-gray-100 shadow-md">
        <Button onClick={() => addElement("text")} gradientDuoTone="greenToBlue">
          Agregar Texto
        </Button>
        <Button onClick={() => addElement("image")} gradientDuoTone="purpleToPink">
          Agregar Imagen
        </Button>
        {selectedElement && selectedElement.type === "text" && (
          <input
            type="text"
            value={selectedElement.content}
            onChange={handleTextChange}
            placeholder="Edita el texto"
            className="border border-gray-300 rounded px-2 py-1"
          />
        )}
      </div>

     
      <div className="flex-1 relative bg-white border border-gray-200">
        {elements.map((el) => (
          <Rnd
            key={el.id}
            size={{ width: el.width, height: el.height }}
            position={{ x: el.x, y: el.y }}
            onDragStop={(e, d) => updateElement(el.id, { x: d.x, y: d.y })}
            onResizeStop={(e, direction, ref, delta, position) =>
              updateElement(el.id, {
                width: parseInt(ref.style.width),
                height: parseInt(ref.style.height),
                ...position,
              })
            }
            onClick={() => setSelectedElement(el)}
            bounds="parent"
            className="border border-dashed border-gray-400"
          >
            {el.type === "text" ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-center">{el.content}</p>
              </div>
            ) : (
              <img
                src={el.content}
                alt="Elemento"
                className="w-full h-full object-cover"
              />
            )}
          </Rnd>
        ))}
      </div>
    </div>
  );
};

export default VisualEditor;


*/
