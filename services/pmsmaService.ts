import { PMSMACenter } from "../types";

// Mock database of PMSMA centers in India
const centers: PMSMACenter[] = [
  {
    id: "1",
    name: "District Hospital Gurguram",
    address: "Civil Lines, Gurugram, Haryana 122001",
    contact: "+91-124-2322444",
    latitude: 28.4595,
    longitude: 77.0266,
    nextCampDate: "2023-11-09",
  },
  {
    id: "2",
    name: "CHC Badshahpur",
    address: "Main Bazar, Badshahpur, Haryana 122101",
    contact: "+91-124-2361234",
    latitude: 28.3880,
    longitude: 77.0566,
    nextCampDate: "2023-11-09",
  },
  {
    id: "3",
    name: "Safdarjung Hospital",
    address: "Ansari Nagar East, New Delhi, Delhi 110029",
    contact: "+91-11-26165060",
    latitude: 28.5683,
    longitude: 77.2066,
    nextCampDate: "2023-11-09",
  },
  {
    id: "4",
    name: "PHC Manesar",
    address: "Sector 1, Manesar, Haryana 122051",
    contact: "+91-124-2290100",
    latitude: 28.3546,
    longitude: 76.9392,
    nextCampDate: "2023-11-09",
  },
  {
    id: "5",
    name: "Civil Hospital Pune",
    address: "Near Sangam Bridge, Pune, Maharashtra 411001",
    contact: "+91-20-26123456",
    latitude: 18.5204,
    longitude: 73.8567,
    nextCampDate: "2023-11-09",
  },
];

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export const getNearestCenters = (lat: number, lon: number): PMSMACenter[] => {
  const centersWithDistance = centers.map((center) => ({
    ...center,
    distance: getDistanceFromLatLonInKm(lat, lon, center.latitude, center.longitude),
  }));

  // Sort by distance
  return centersWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
};
