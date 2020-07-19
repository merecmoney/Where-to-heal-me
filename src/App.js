import React, { useEffect, useState } from "react";
import axios from "axios";
import Test from "./components/Test";
import CardContainer from "./components/CardContainer";
import Card from "./components/Card";

function App() {
  const [data, setData] = useState(new Map());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://datos.cdmx.gob.mx/api/records/1.0/search/?dataset=capacidad-hospitalaria&q=&rows=100&sort=fecha&facet=fecha&facet=nombre_hospital&facet=institucion&facet=estatus_capacidad_hospitalaria&facet=estatus_capacidad_uci"
        );
        // "https://api.mapbox.com/directions/v5/mapbox/driving/19.195300,99.110500;19.406400,99.150500?geometries=geojson&access_token=pk.eyJ1IjoibWVyZWNtb25leSIsImEiOiJja2NzbHRtdGswejRpMnVtcWhpMm1vdG5tIn0.Lj4G9YQJozP1TsNLnOvkfQ"

        const data = response.data;
        const hospitales = data.records;

        let HospitalesMap = new Map();
        for (const record of hospitales) {
          let nombreHospital = record.fields.nombre_hospital;
          let informacionHospital = record.fields;
          if (!HospitalesMap.get(nombreHospital)) {
            HospitalesMap.set(nombreHospital, informacionHospital);
          }
        }

        setData((prevState) => {
          let newState = prevState;
          newState = HospitalesMap;
          return newState;
        });
      } catch (error) {
        console.log("ERROR RECUPERANDO DATOS");
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(data);
  return (
    <>
      <CardContainer data={Array.from(data.values())} />
      <Test></Test>
    </>
  );
}

export default App;
