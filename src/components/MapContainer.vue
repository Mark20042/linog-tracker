<script setup>
import { ref, onMounted, watch } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const props = defineProps({
  earthquakes: {
    type: Array,
    default: () => [],
  },
});

const mapContainer = ref(null);
let map = null;
let markersLayer = null;
let markersMap = {};

defineExpose({
  focusQuake: (quake) => {
    if (map && quake) {
      map.flyTo([quake.lat, quake.long], 12);
      const marker = markersMap[quake.id];
      if (marker) {
        marker.openPopup();
      }
    }
  },
});

onMounted(() => {
  initMap();
});

watch(
  () => props.earthquakes,
  (newVal) => {
    if (map) {
      updateMarkers(newVal);
    }
  },
);

function initMap() {
  map = L.map(mapContainer.value).setView([12.8797, 121.774], 6);

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    },
  ).addTo(map);

  markersLayer = L.layerGroup().addTo(map);

  if (props.earthquakes.length > 0) {
    updateMarkers(props.earthquakes);
  }
}

function updateMarkers(data) {
  markersLayer.clearLayers();
  markersMap = {};

  data.forEach((eq) => {
    const color = getMagnitudeColor(eq.mag);
    const radius = getMagnitudeRadius(eq.mag);

    const marker = L.circleMarker([eq.lat, eq.long], {
      color: color,
      fillColor: color,
      fillOpacity: 0.7,
      radius: radius,
      weight: 1,
    });

    marker.bindPopup(`
      <div class="popup-content">
        <h3>${eq.location}</h3>
        <p><strong>Magnitude:</strong> ${eq.mag}</p>
        <p><strong>Depth:</strong> ${eq.depth}</p>
        <p><strong>Time:</strong> ${eq.dateTime}</p>
      </div>
    `);

    markersLayer.addLayer(marker);
    markersMap[eq.id] = marker;
  });
}

function getMagnitudeColor(mag) {
  if (mag >= 6) return "#ef4444"; // Red
  if (mag >= 5) return "#f97316"; // Orange
  if (mag >= 4) return "#eab308"; // Yellow
  if (mag >= 3) return "#84cc16"; // Lime
  return "#22d3ee"; // Cyan
}

function getMagnitudeRadius(mag) {
  return mag * 1.5; // Scale radius by magnitude
}
</script>

<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* Custom Popup Styles */
:deep(.leaflet-popup-content-wrapper) {
  background: var(--card-bg);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}
:deep(.leaflet-popup-tip) {
  background: var(--card-bg);
}
:deep(.popup-content h3) {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: var(--primary-color);
}
:deep(.popup-content p) {
  margin: 0.2rem 0;
  font-size: 0.875rem;
}
</style>
