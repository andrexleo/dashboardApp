import React, { useState, useEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

// Simulación de llamada a API que retorna datos después de un tiempo
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        { category: "Enero", value: 45 },
        { category: "Febrero", value: 55 },
        { category: "Marzo", value: 30 }
      ];
      console.log("Datos simulados obtenidos:", data);  // Asegúrate de que los datos se obtienen correctamente
      resolve(data);
    }, 1000); // Simulamos un retraso de 1 segundo en obtener los datos
  });
};

const ChartComponent = () => {
  const [chartType, setChartType] = useState('bar');  // Estado para el tipo de gráfico
  const [chartData, setChartData] = useState(null);  // Estado para los datos de la gráfica

  // Simulamos la llamada a una API para obtener los datos
  useEffect(() => {
    fetchData().then(data => {
      console.log("Datos cargados:", data);  // Verificar si los datos son recibidos
      setChartData(data);  // Cuando los datos están listos, los establecemos
    });
  }, []);

  useEffect(() => {
    // Verifica que haya datos antes de renderizar el gráfico
    if (!chartData || chartData.length === 0) {
      console.error("No hay datos disponibles para mostrar el gráfico.");
      return;
    }

    console.log("Renderizando el gráfico con los datos:", chartData);  // Verifica si los datos llegan al gráfico

    let root = am5.Root.new("chartdiv");

    // Configuración del tema animado (opcional)
    root.setThemes([am5themes_Animated.new(root)]);

    // Crear el gráfico XY
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true
    }));

    // Crear los ejes
    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 })
    }));

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    // Configurar la serie en base al tipo de gráfico
    let series;
    if (chartType === 'bar') {
      series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category"
      }));
    } else if (chartType === 'line') {
      series = chart.series.push(am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category",
        stroke: am5.color(0xff0000),
        strokeWidth: 2
      }));
    } else if (chartType === 'stacked') {
      series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category",
        stacked: true
      }));
    }

    // Asignar los datos al gráfico
    series.data.setAll(chartData);

    // Dispose del gráfico cuando el componente se desmonta
    return () => {
      root.dispose();
    };
  }, [chartType, chartData]);  // Renderizar el gráfico al cambiar el tipo o los datos

  // Renderizado condicional: solo renderiza el gráfico si los datos están listos
  return (
    <div>
      <select onChange={(e) => setChartType(e.target.value)}>
        <option value="bar">Gráfico de Barras</option>
        <option value="line">Gráfico de Líneas</option>
        <option value="stacked">Gráfico Apilado</option>
      </select>

      {/* Si los datos están listos, renderiza el gráfico */}
      {chartData && (
        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
      )}
    </div>
  );
};

export default ChartComponent;
