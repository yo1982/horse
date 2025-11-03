import React, { useState } from 'react';
import Card from '../components/Card';
import Modal from '../components/Modal';
import { TrainingProgram } from '../types';
import { generateText } from '../services/geminiService';

const trainingPrograms: TrainingProgram[] = [
  {
    id: 'beginner-horsemanship',
    title: 'Beginner Horsemanship',
    description: 'Learn the fundamentals of horse care, handling, and riding in a safe and supportive environment. Perfect for new riders of all ages.',
    imageUrl: 'https://images.unsplash.com/photo-1598974357253-93d2cd72f581?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'dressage-fundamentals',
    title: 'Dressage Fundamentals',
    description: 'Develop harmony and precision with your horse. Our experienced instructors will guide you through the foundational movements of classical dressage.',
    imageUrl: 'https://images.unsplash.com/photo-1599157876241-72354a559133?q=80&w=1964&auto=format&fit=crop',
  },
  {
    id: 'advanced-show-jumping',
    title: 'Advanced Show Jumping',
    description: 'For the competitive rider, this program focuses on advanced techniques, course strategy, and building confidence over larger obstacles.',
    imageUrl: 'https://images.unsplash.com/photo-1552286450-4a8698314128?q=80&w=2070&auto=format&fit=crop',
  },
];

const Training: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [formData, setFormData] = useState({ riderName: '', horseName: '', email: '', preferredDate: '' });

  const handleOpenModal = (program: TrainingProgram) => {
    setSelectedProgram(program);
    setConfirmationMessage('');
    setFormData({ riderName: '', horseName: '', email: '', preferredDate: '' });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProgram(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProgram) return;

    setIsLoading(true);
    setConfirmationMessage('');

    const prompt = `Generate a friendly and professional confirmation message for a training session request. The user has requested to book the "${selectedProgram.title}" program.
    Request Details:
    - Rider's Name: ${formData.riderName}
    - Horse's Name: ${formData.horseName || 'N/A'}
    - Contact Email: ${formData.email}
    - Preferred Date: ${formData.preferredDate}
    
    The message should acknowledge the request, summarize the details, and state that our scheduling team will contact them at their email address within 24 hours to confirm the date and instructor availability. Keep it encouraging and professional.`;

    const response = await generateText(prompt);
    setConfirmationMessage(response);
    setIsLoading(false);
  };

  return (
    <div className="py-16 bg-stone-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-stone-800">Training Programs</h1>
          <p className="text-stone-600 mt-2 max-w-2xl mx-auto">
            Our expert trainers offer programs for all levels, from foundational skills to competitive excellence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainingPrograms.map((prog) => (
            <Card
              key={prog.id}
              title={prog.title}
              description={prog.description}
              imageUrl={prog.imageUrl}
              actionText="Request Information"
              onAction={() => handleOpenModal(prog)}
            />
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={`Inquire About: ${selectedProgram?.title || ''}`}>
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
            <input type="text" name="riderName" placeholder="Rider's Name" value={formData.riderName} onChange={handleInputChange} required className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
            <input type="text" name="horseName" placeholder="Horse's Name (if applicable)" value={formData.horseName} onChange={handleInputChange} className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
            <div>
              <label htmlFor="preferredDate" className="block text-sm font-medium text-stone-600 mb-1">Preferred Date</label>
              <input id="preferredDate" type="date" name="preferredDate" value={formData.preferredDate} onChange={handleInputChange} required className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="mt-6 w-full bg-amber-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-amber-900 transition-colors disabled:bg-stone-400">
            {isLoading ? 'Processing...' : 'Submit Inquiry'}
          </button>
        </form>
      )}
      </Modal>
    </div>
  );
};

export default Training;
