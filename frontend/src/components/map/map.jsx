// src/components/MapDashboard.jsx
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

const MapDashboard = () => {
  const [markers, setMarkers] = useState([]);
  const [currentInfoWindow, setCurrentInfoWindow] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [unitTypes, setUnitTypes] = useState([]);

  // Iconos personalizados (definidos como objetos simples)
  const getUnitIcons = () => ({
    trailer: {
      url:"https://img.icons8.com/external-smashingstocks-isometric-smashing-stocks/55/external-Generator-environment-smashingstocks-isometric-smashing-stocks.png",
      scaledSize: { width: 36, height: 36 },
      anchor: { x: 18, y: 18 },
    },
    car: {
      url: "https://img.icons8.com/external-smashingstocks-isometric-smashing-stocks/55/external-Generator-environment-smashingstocks-isometric-smashing-stocks.png",
      scaledSize: { width: 36, height: 36 },
      anchor: { x: 18, y: 18 },
    },
    stationary: {
      url: "https://img.icons8.com/external-smashingstocks-isometric-smashing-stocks/55/external-Generator-environment-smashingstocks-isometric-smashing-stocks.png",
      scaledSize: { width: 36, height: 36 },
      anchor: { x: 18, y: 18 },
    },
    tractor: {
      url: "https://img.icons8.com/external-smashingstocks-isometric-smashing-stocks/55/external-Generator-environment-smashingstocks-isometric-smashing-stocks.png",
      scaledSize: { width: 36, height: 36 },
      anchor: { x: 18, y: 18 },
    },
  });

  const defaultUnitIcon = {
    url: "https://img.icons8.com/external-smashingstocks-isometric-smashing-stocks/55/external-Generator-environment-smashingstocks-isometric-smashing-stocks.png",
    scaledSize: { width: 36, height: 36 }, // Cambiado
    anchor: { x: 18, y: 18 }, // Cambiado
  };

  const tagIcon = {
    url: "https://img.icons8.com/external-smashingstocks-circular-smashing-stocks/65/external-GPS-world-tourism-day-smashingstocks-circular-smashing-stocks.png",
    scaledSize: { width: 24, height: 24 }, // Cambiado
    anchor: { x: 12, y: 12 }, // Cambiado
  };

  // Función para capitalizar la primera letra
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Función para poblar el dropdown de tipos
  const populateTypeDropdown = (units) => {
    const types = [...new Set(units.map((unit) => unit.type))]
      .filter((type) => type && type.toLowerCase() !== "stationary")
      .map((type) => ({
        value: type.toLowerCase(),
        label: capitalizeFirstLetter(type),
      }));

    setUnitTypes(types);
  };

  // Función para buscar marcadores
  const searchMarkers = () => {
    const matchedMarkers = markers.filter((m) => {
      const matchesSerial = searchText
        ? m.label.includes(searchText.toLowerCase())
        : true;
      const matchesType = selectedType
        ? m.type === selectedType
        : true;

      return matchesSerial && matchesType;
    });

    setMarkers((prevMarkers) =>
      prevMarkers.map((m) => {
        if (matchedMarkers.includes(m)) {
          return { ...m, visible: true };
        } else {
          return { ...m, visible: false };
        }
      })
    );

    // Abrir la InfoWindow del primer marcador coincidente
    if (matchedMarkers.length > 0) {
      setCurrentInfoWindow(matchedMarkers[0].id);
    } else {
      alert("No se encontraron unidades o etiquetas que coincidan con los criterios.");
    }
  };

  // Función para resetear todos los marcadores
  const resetMarkers = () => {
    setMarkers((prevMarkers) =>
      prevMarkers.map((m) => ({ ...m, visible: true }))
    );
    setCurrentInfoWindow(null);
    setSearchText('');
    setSelectedType('');
  };

  // Función para fetch y procesar datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const unitResponse = await fetch(
          "https://gps.erpgroup.mx/api/v1/unit/list.json?key=c38d98d176460621850b20fc73eba5d3f5ce14de"
        );
        const unitData = await unitResponse.json();
        const units = unitData.data.units.map((unit) => ({
          id: unit.unit_id,
          lat: unit.lat,
          lng: unit.lng,
          number: unit.number || `Unit ID: ${unit.unit_id}`,
          last_update: unit.last_update,
          type:
            unit.type === 'car'
              ? 'Vehículos'
              : unit.type === 'trailer'
              ? 'Equipos'
              : unit.type,
          icon: unit.icon,
        }));

        const tagResponse = await fetch(
          "https://gps.erpgroup.mx/api/v1/ble_tags/list.json?key=c38d98d176460621850b20fc73eba5d3f5ce14de"
        );
        const tagData = await tagResponse.json();
        const tags = tagData.data.tags.map((tag) => ({
          id: tag.id,
          lat: tag.location.lat,
          lng: tag.location.lng,
          name: tag.name,
          last_scan: tag.last_scan,
          type: "ble_tag",
        }));

        const allMarkers = [...units, ...tags].map((item) => ({
          id: item.id,
          position: { lat: item.lat, lng: item.lng },
          title: item.type === "ble_tag" ? item.name : item.number,
          type: item.type,
          info: item.type === "ble_tag"
            ? `<h3>${item.name}</h3><p>Última escaneo: ${new Date(item.last_scan).toLocaleString()}</p>`
            : `<h3>${item.number}</h3><p>Última actualización: ${new Date(item.last_update).toLocaleString()}</p>`,
          icon: item.type === "ble_tag" ? tagIcon : (item.icon ? getUnitIcons()[item.icon.toLowerCase()] || defaultUnitIcon : defaultUnitIcon),
          visible: true,
        }));
        

        setMarkers(allMarkers);
        populateTypeDropdown(units);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyD3MLdg4sj-6oxwiroJhlI9vrpOtTfc1Vo">
      <GoogleMap
        mapContainerStyle={{ height: "100vh", width: "100%" }}
        zoom={5}
        center={{ lat: 23.634501, lng: -102.552784 }}
        mapTypeId="satellite"
      >
        {/* Contenedor de Búsqueda */}
        <div
          className={`p-2 bg-white shadow-md absolute top-2 left-1/2 transform -translate-x-1/2 z-50 rounded-md flex items-center gap-2 ${
            isSearchActive ? "flex-col space-y-2 md:flex-row md:space-y-0" : ""
          }`}
        >
          <div
            className={`flex items-center gap-2 ${
              isSearchActive ? "flex-col space-y-2 w-full" : ""
            }`}
          >
            <input
              type="text"
              id="search-input"
              placeholder="Ingresa serial"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <select
              id="type-select"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">-- Selecciona Tipo --</option>
              {unitTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <button
              onClick={searchMarkers}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Buscar
            </button>
            <button
              onClick={resetMarkers}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Resetear
            </button>
          </div>
          {/* Botón de lupa para pantallas pequeñas */}
          <button
            className="md:hidden text-green-600"
            onClick={() => setIsSearchActive(!isSearchActive)}
          >
            <FaSearch size={20} />
          </button>
        </div>

        {/* Marcadores */}
        {markers.map((marker) => (
          marker.visible && (
            <Marker
              key={marker.id}
              position={marker.position}
              title={marker.title}
              icon={marker.icon}
              onClick={() => setCurrentInfoWindow(marker.id)}
            />
          )
        ))}

        {/* InfoWindow */}
        {currentInfoWindow && (
          <InfoWindow
            position={markers.find(m => m.id === currentInfoWindow).position}
            onCloseClick={() => setCurrentInfoWindow(null)}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: markers.find(m => m.id === currentInfoWindow).info,
              }}
            />
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapDashboard;
