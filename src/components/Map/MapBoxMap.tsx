'use client';
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import L from 'leaflet'

// Custom marker icons for better visibility
const userIcon = L.icon({
  iconUrl: 'src/assets/user-location.png', // Add this icon to your public folder
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const doctorIcon = L.icon({
  iconUrl: 'src/assets/doctor-location.png', // Add this icon to your public folder
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {ssr:false}); 
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {ssr:false});
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), {ssr:false});
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {ssr:false});

export default function Maps() {
  const [position, setPosition] = useState<[number, number]>([28.474388, 77.503990]);
  const [doctors, setDoctors] = useState([
    {
      name: "Dr. Manisha Jain",
      position: [28.476388, 77.505990],
      specialty: "Psychiatrist",
      rating: 4.8,
      distance: "0.5km"
    },
    {
      name: "Dr. Vishal Chhabra",
      position: [28.472388, 77.501990],
      specialty: "Psychologist",
      rating: 4.5,
      distance: "0.8km"
    },
    {
      name: "Dr Paramjeet Singh",
      position: [28.638145, 77.187488],
      specialty: "Psychiatrist",
      rating: 4.7,
      distance: "58.4 km"
    },
    // Add more doctors as needed
  ]);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          setPosition([location.coords.latitude, location.coords.longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{height:'50vh'}}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      
      {/* User's location marker */}
      <Marker position={position} icon={userIcon}>
        <Popup>
          Your Location
        </Popup>
      </Marker>

      {/* Doctor markers */}
      {doctors.map((doctor, index) => (
        <Marker 
          key={index} 
          position={doctor.position as [number, number]} 
          icon={doctorIcon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">{doctor.name}</h3>
              <p className="text-sm text-gray-600">{doctor.specialty}</p>
              <p className="text-sm">Rating: {doctor.rating}/5</p>
              <p className="text-sm text-gray-500">Distance: {doctor.distance}</p>
              <button 
                className="mt-2 bg-primary text-white px-4 py-1 rounded-full text-sm"
                onClick={() => window.open(`https://maps.google.com/?q=${doctor.position[0]},${doctor.position[1]}`, '_blank')}
              >
                Get Directions
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
