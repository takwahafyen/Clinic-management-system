// Type definitions for Clinic Management System

export type UserRole = 'doctor' | 'nurse' | 'pharmacist';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  specialization?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type DiabeticStatus =
  | 'Non_Diabetic'
  | 'Diabete_Type1'
  | 'Diabete_Type2'
  | 'Diabete_Type3';

export type ReportPriority = 'Urgent' | 'Stable';

export interface VitalSigns {
  _id?: string;
  patientId?: string;
  bloodPressure?: string;
  temperature?: number;
  pulseRate?: number;
  diabeticStatus?: DiabeticStatus;
  recordedBy?: string;
  createdAt?: string;
}

export interface MedicalReport {
  _id?: string;
  patientId?: string;
  doctorId?: string;
  doctorName?: string;
  title: string;
  diagnosis: string;
  description: string;
  status: ReportPriority;
  treatment?: string;
  createdAt?: string;
}

export interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  address?: string;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  bloodGroup?: string;
  room?: string;
  medicalHistory?: string;
  vitalSigns?: VitalSigns[];
  reports?: MedicalReport[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  isFetching: boolean;
  error: boolean;
}

export type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' };
