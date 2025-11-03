import React, { useState } from 'react';
import Modal from '../components/Modal';
import { EquestrianService } from '../types';
import { generateText } from '../services/geminiService';

const ServiceItem: React.FC<{ service: EquestrianService; onSelect: () => void }> = ({ service, onSelect }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform duration-300">
        <div className="text-amber-800 mb-4">{service.icon}</div>
        <h3 className="text-xl font-bold text-stone-800 mb-2">{service.title}</h3>
        <p className="text-stone-600 flex-grow mb-4">{service.description}</p>
        <button onClick={onSelect} className="mt-auto w-full bg-stone-200 text-stone-800 font-semibold py-2 px-4 rounded-md hover:bg-stone-300 transition-colors">
            Request Service
        </button>
    </div>
);

const equestrianServices: EquestrianService[] = [
    {
        id: 'grooming',
        title: 'Full Grooming',
        description: 'Includes brushing, hoof picking, mane/tail care, and a post-grooming conditioning spray.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor"><path d="M17.926 9.385l-3.364-1.682a3 3 0 00-2.636 0L8.56 9.385a3 3 0 00-1.036 4.349l1.682 3.364a3 3 0 004.348 1.036l3.364-1.682a3 3 0 001.036-4.349l-1.682-3.364a3 3 0 00-2.636 0z" /><path d="M5.429 18.357l-3.364-1.682a3 3 0 01-1.036-4.349l1.682-3.364a3 3 0 014.348-1.036l3.364 1.682" /></svg>
    },
    {
        id: 'farrier',
        title: 'Farrier Service',
        description: 'Professional trimming, shoeing, and hoof health assessments by our certified on-site farrier.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
    },
    {
        id: 'vet-check',
        title: 'Veterinary Check-up',
        description: 'Routine wellness exams, vaccinations, and minor consultations with our trusted veterinary partner.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.12.28a.75.75 0 01-.59 1.22H6.69a.75.75 0 01-.59-1.22l.12-.28H5a2 2 0 01-2-2V5zm1.5 0v1h11V5a.5.5 0 00-.5-.5h-10a.5.5 0 00-.5.5zM4 8a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
    },
    {
        id: 'nutrition-plan',
        title: 'Specialized Diet Plan',
        description: 'Custom nutrition planning based on your horse\'s age, workload, and health requirements.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13z" clipRule="evenodd" /></svg>
    },
];

const Services: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<EquestrianService | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [formData, setFormData] = useState({ horseName: '', ownerName: '', email: '', preferredDate: '' });

    const handleOpenModal = (service: EquestrianService) => {
        setSelectedService(service);
        setConfirmationMessage('');
        setFormData({ horseName: '', ownerName: '', email: '', preferredDate: '' });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedService) return;

        setIsLoading(true);
        setConfirmationMessage('');

        const prompt = `Generate a friendly and professional confirmation message for a service request. The user has requested the "${selectedService.title}" service.
        Request Details:
        - Horse's Name: ${formData.horseName}
        - Owner's Name: ${formData.ownerName}
        - Contact Email: ${formData.email}
        - Preferred Date: ${formData.preferredDate}
        
        The message should acknowledge the request, summarize the details, and state that we will confirm the appointment via email shortly. Keep it efficient and professional.`;

        const response = await generateText(prompt);
        setConfirmationMessage(response);
        setIsLoading(false);
    };

    return (
        <div className="py-16 bg-stone-100">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-stone-800">Equine Services</h1>
                    <p className="text-stone-600 mt-2 max-w-2xl mx-auto">
                        Comprehensive care services to keep your horse healthy, happy, and looking its best.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {equestrianServices.map((service) => (
                        <ServiceItem key={service.id} service={service} onSelect={() => handleOpenModal(service)} />
                    ))}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={`Request: ${selectedService?.title || ''}`}>
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
                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-medium text-stone-600 mb-1">Preferred Date</label>
                    <input id="preferredDate" type="date" name="preferredDate" value={formData.preferredDate} onChange={handleInputChange} required className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
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

export default Services;
