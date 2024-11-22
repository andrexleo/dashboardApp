import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const AmChartComponent = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null); // Usamos un ref para referenciar el contenedor del gráfico

  // Función para consumir la API
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/data");
      const result = await response.json();
      setData(result); // Guardamos los datos obtenidos
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  // Llamamos a la API cuando el componente se monta
  useEffect(() => {
    fetchData();
  }, []);

  // Configurar la gráfica usando amCharts
  useLayoutEffect(() => {
    if (data.length > 0 && chartRef.current) {
      let root = am5.Root.new(chartRef.current); // Inicializamos root con el ref del div

      root.setThemes([am5themes_Animated.new(root)]);

      // Crear el chart
      let chart1 = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX: true,
        })
      );

      // Crear ejes
      let xRenderer = am5xy.AxisRendererX.new(root, {
        minGridDistance: 30,
        minorGridEnabled: true,
      });

      let xAxis = chart1.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: "branch", // Utilizamos el campo 'branch' de los datos de la API
          renderer: xRenderer,
        })
      );

      let yAxis = chart1.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {}),
        })
      );

      // Crear series
      let series = chart1.series.push(
        am5xy.ColumnSeries.new(root, {
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "utilization", // Utilizamos el campo 'utilization' de los datos de la API
          categoryXField: "branch",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
          }),
        })
      );

      series.columns.template.setAll({
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        strokeOpacity: 0,
      });

      // Establecer los datos
      xAxis.data.setAll(data);
      series.data.setAll(data);

      // Animación de carga
      series.appear(1000);
      chart1.appear(1000, 100);

      // Limpiar el gráfico al desmontar el componente
      return () => {
        root.dispose(); // Esto asegura que no se creen múltiples instancias del gráfico
      };
    }
  }, [data]);

  return (
    <div>
      <h1>Gráfica de Utilización por Sucursal</h1>
      {/* Div referenciado por chartRef */}
      <div ref={chartRef} id="chartdiv15" style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
};

export default AmChartComponent;
