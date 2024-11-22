import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const ChartComponent = () => {
  const chartRef = useRef(null);
  const [chartType, setChartType] = useState("bar"); // Estado para controlar el tipo de gráfico
  const [data, setData] = useState([]); // Estado para los datos de la API

  // Fetch datos de la API
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/data");
      const result = await response.json();
      // Transformar los datos para la gráfica
      const chartData = result.utilizationData.map((item) => ({
        country: item.branch, // Asignar sucursal como categoría
        value: item.utilization // Asignar valor de utilización
      }));
      setData(chartData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Llamar a la API cuando el componente se monta
  useEffect(() => {
    fetchData();
  }, []);

  useLayoutEffect(() => {
    let root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true
      })
    );

    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // Crear ejes
    let xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
      minorGridEnabled: true
    });

    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15
    });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "country",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, { strokeOpacity: 0.1 })
      })
    );

    // Crear series según el tipo de gráfico seleccionado
    let series;
    if (chartType === "bar") {
      series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Bar Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          categoryXField: "country",
          tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" })
        })
      );
      series.columns.template.setAll({
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        strokeOpacity: 0
      });
    } else if (chartType === "line") {
      series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: "Line Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          categoryXField: "country",
          tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" })
        })
      );
      series.strokes.template.setAll({ strokeWidth: 2 });
    } else if (chartType === "stacked") {
      series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Stacked Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          categoryXField: "country",
          stacked: true, // Gráfica apilada
          tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" })
        })
      );
      series.columns.template.setAll({
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        strokeOpacity: 0
      });
    }

    // Usar los datos del estado
    if (data.length > 0) {
      xAxis.data.setAll(data);
      series.data.setAll(data);
    }

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [chartType, data]); // El gráfico se actualizará cada vez que cambie el tipo o los datos

  return (
    <div>
      {/* Botones para cambiar entre los tipos de gráficos */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setChartType("bar")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Gráfico de Barras
        </button>
        <button
          onClick={() => setChartType("line")}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Gráfico de Líneas
        </button>
        <button
          onClick={() => setChartType("stacked")}
          className="px-4 py-2 bg-purple-500 text-white rounded"
        >
          Gráfico Apilado
        </button>
      </div>

      {/* Contenedor del gráfico */}
      <div ref={chartRef} style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
};

export default ChartComponent;
