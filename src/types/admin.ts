import { VerifiedHospitalRecord } from '../utils/hospitalVerification';

export interface HospitalAdminData extends VerifiedHospitalRecord {
  email?: string;
  emergencyContact?: string;
  totalBeds?: number;
  icuBeds?: number;
  oxygenBeds?: number;
  generalBeds?: number;
  nodalOfficer?: string;
  nodalOfficerContact?: string;
  mitraLead?: string;
  deskContact?: string;
  tmsPortalId?: string;
  operationalHours?: string;
}

export type DeskRole = 'mitra' | 'preauth' | 'bed';

export interface MitraPatientToken {
  id: string;
  tokenNumber: string;
  patientName: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  abhaId: string;
  pmjayCardNumber: string;
  category: 'OPD Verification' | 'Emergency Priority' | 'Pre-Auth Assist' | 'Golden Card Issue';
  status: 'Waiting' | 'In-Verification' | 'Approved' | 'Admitted';
  time: string;
  counter: string;
  notes?: string;
}

export interface MitraCounter {
  id: string;
  counterNumber: string;
  name: string;
  staffName: string;
  staffDesignation: string;
  status: 'Active' | 'On Break' | 'Closed';
  patientsHandled: number;
}

export interface PreAuthCase {
  id: string;
  caseNumber: string;
  patientName: string;
  patientAge: number;
  pmjayId: string;
  packageCode: string;
  packageName: string;
  specialty: string;
  requestedAmount: number;
  approvedAmount?: number;
  status: 'Approved' | 'Query Raised' | 'Under Review' | 'Cashless Cleared' | 'Rejected';
  submittedAt: string;
  treatingDoctor: string;
  queryDetails?: string;
  documentsCount: number;
}

export interface WardBed {
  id: string;
  bedCode: string;
  wardCategory: 'General Male' | 'General Female' | 'ICU / CCU' | 'Oxygen Ward' | 'HDU' | 'Pediatric / NICU';
  status: 'Available' | 'Occupied' | 'Reserved' | 'Sanitizing';
  patientName?: string;
  diagnosis?: string;
  admittedAt?: string;
}

export interface DoctorRosterItem {
  id: string;
  doctorName: string;
  specialty: string;
  qualification: string;
  shift: 'Morning (8 AM - 2 PM)' | 'Evening (2 PM - 8 PM)' | 'Night (8 PM - 8 AM)' | '24/7 On-Call';
  status: 'On Duty' | 'In Surgery' | 'On Ward Round' | 'Off Duty';
  contact: string;
}
