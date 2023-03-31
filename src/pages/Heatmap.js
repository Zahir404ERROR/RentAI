import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import { addressPoints } from "./addressPoints";

var map;
function Heatmap() {
  useEffect(() => {
    if(map) { 
      map = map.off(); 
      map = map.remove();
    }  
    // create map
    map = L.map("map").setView([51.505, -0.09], 12);

    // add the OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // add markers to map
    const points = addressPoints
      ? addressPoints.map((p) => {
          return [p[0], p[1]];
        })
      : [];

    // add heat map layer to the map
    L.heatLayer(points, {minOpacity: 0.001, max: 0.2, radius: 50, useLocalExtrema: false, blur: 10}).addTo(map);
  
  }, []);
  // render
  return <div id="map" style={{ height: "75vh" }}></div>;
}

export default Heatmap;
