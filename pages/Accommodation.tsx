import React, { useState } from 'react';
import Card from '../components/Card';
import Modal from '../components/Modal';
import { Accommodation as AccommodationType } from '../types';
import { generateText } from '../services/geminiService';

const accommodationOptions: AccommodationType[] = [
  {
    id: 'standard-stall',
    title: 'Standard Stall',
    description: 'A comfortable and secure 12x12 stall with rubber matting, fresh bedding, and automatic waterer. Perfect for daily or short-term stays.',
    imageUrl: 'https://images.unsplash.com/photo-1551291835-22d6cf8b242d?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'premium-suite',
    title: 'Premium Suite',
    description: 'A spacious 14x14 suite with premium bedding, a window for natural light, and a personal tack locker. Ideal for show horses or long-term residents.',
    imageUrl: 'https://images.unsplash.com/photo-1621213348622-0a1a8909f1a2?q=80&w=1932&auto=format&fit=crop',
  },
  {
    id: 'pasture-paddock',
    title: 'Pasture Paddock',
    description: 'A serene and spacious outdoor paddock with a run-in shelter. Allows for natural grazing and movement, shared with a small, compatible group.',
    imageUrl: 'https://images.unsplash.com/photo-1599282928311-ab8a1608c016?q=80&w=2070&auto=format&fit=crop',
  },
];

const Accommodation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState<AccommodationType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [formData, setFormData] = useState({ horseName: '', ownerName: '', email: '', startDate: '', endDate: '' });

  const handleOpenModal = (accommodation: AccommodationType) => {
    setSelectedAccommodation(accommodation);
    setConfirmationMessage('');
    setFormData({ horseName: '', ownerName: '', email: '', startDate: '', endDate: '' });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAccommodation(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAccommodation) return;

    setIsLoading(true);
    setConfirmationMessage('');

    const prompt = `Generate a friendly and professional confirmation message for a horse accommodation booking request. The user has requested to book the "${selectedAccommodation.title}".
    Booking Details:
    - Horse's Name: ${formData.horseName}
    - Owner's Name: ${formData.ownerName}
    - Owner's Email: ${formData.email}
    - Requested Start Date: ${formData.startDate}
    - Requested End Date: ${formData.endDate}
    
    The message should acknowledge the request, summarize the details, and state that a team member will contact them at their email address within 24 hours to finalize the booking and payment. Keep it concise and welcoming.`;
    
    const response = await generateText(prompt);
    setConfirmationMessage(response);
    setIsLoading(false);
  };

  return (
    <div className="py-16 bg-stone-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-stone-800">Horse Accommodation</h1>
          <p className="text-stone-600 mt-2 max-w-2xl mx-auto">
            We offer a variety of stabling options to ensure the comfort, safety, and well-being of your horse.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accommodationOptions.map((acc) => (
            <Card
              key={acc.id}
              title={acc.title}
              description={acc.description}
              imageUrl={acc.imageUrl}
              actionText="Request Booking"
              onAction={() => handleOpenModal(acc)}
            />
          ))}
        </div>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={`Book: ${selectedAccommodation?.title || ''}`}>
        {confirmationMessage ? (
            <div className="text-center">
                <p className="text-stone-600 whitespace-pre-wrap">{confirmationMessage}</p>
                <button onClick={handleCloseModal} className="mt-6 w-full bg-amber-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-amber-900 transition-colors">
                    Close
                </button>
            </div>
        ) : (
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <input type="text" name="horseName" placeholder="Horse's Name" value={formData.horseName} onChange={handleInputChange} required className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
                    <input type="text" name="ownerName" placeholder="Owner's Name" value={formData.ownerName} onChange={handleInputChange} required className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
                    <div className="grid grid-cols-2 gap-4">
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" aria-label="Start Date" />
                        <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} required className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" aria-label="End Date" />
                    </div>
                </div>
                <button type="submit" disabled={isLoading} className="mt-6 w-full bg-amber-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-amber-900 transition-colors disabled:bg-stone-400">
                    {isLoading ? 'Processing...' : 'Submit Request'}
                </button>
            </form>
        )}
      </Modal>
    </div>
  );
};

export default Accommodation;
