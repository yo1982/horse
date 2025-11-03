import React from 'react';

export enum Page {
  Home = 'Home',
  Accommodation = 'Accommodation',
  Training = 'Training',
  Services = 'Services',
}

export interface Accommodation {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface EquestrianService {
    id: string;
    title: string;
    description: string;
    // Fix: Use React.ReactNode instead of JSX.Element in a .ts file to resolve JSX namespace error.
    icon: React.ReactNode;
}