export interface Hospital {
  id: string;
  name: string;
  nameHi: string;
  address: string;
  addressHi: string;
  phone: string;
  emergency: string;
  beds: number;
  specialties: string[];
  specialtiesHi: string[];
  type: string;
  typeCode?: string;
  lat: number;
  lng: number;
  distanceKm?: number;
  ayushmanMitraDesk: boolean;
  rating: number;
}
