"use client";

import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

const places = [
  { name: "Kuroki Shabu Shabu", lat: 43.4617, lng: -80.521 },
  { name: "Watami Sushi", lat: 43.4669, lng: -80.5217 },
  { name: "Kin Gyu", lat: 43.4647, lng: -80.5226 },
  { name: "Gyubee", lat: 43.4693, lng: -80.5201 },
  { name: "Kinton Ramen", lat: 43.4678, lng: -80.5213 },
  { name: "Ajisen Ramen", lat: 43.4672, lng: -80.522 },
  { name: "The Keg", lat: 43.5032, lng: -80.5303 },
];

const MAP_STYLE = {
  version: 8 as const,
  sources: {
    "carto-dark": {
      type: "raster" as const,
      tiles: ["https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors © CARTO",
    },
  },
  layers: [
    {
      id: "background",
      type: "raster" as const,
      source: "carto-dark",
    },
  ],
};

export default function FoodMap() {
  return (
    <div className="rounded overflow-hidden border border-border">
      <Map
        initialViewState={{
          latitude: 43.474,
          longitude: -80.524,
          zoom: 12.5,
        }}
        style={{ width: "100%", height: 280 }}
        mapStyle={MAP_STYLE}
        attributionControl={false}
      >
        {places.map((place) => (
          <Marker
            key={place.name}
            latitude={place.lat}
            longitude={place.lng}
            anchor="bottom"
          >
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(
                place.name + " Waterloo Ontario"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              title={place.name}
            >
              <div className="flex flex-col items-center gap-0.5 group">
                <div className="text-[10px] bg-black/80 text-white px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {place.name}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-red-500 drop-shadow"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.083 3.203-4.608 3.203-7.327a7.5 7.5 0 10-15 0c0 2.719 1.259 5.244 3.203 7.327a19.579 19.579 0 002.682 2.282 16.975 16.975 0 001.144.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </a>
          </Marker>
        ))}
      </Map>
    </div>
  );
}
