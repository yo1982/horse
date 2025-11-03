
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  actionText: string;
  onAction: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, actionText, onAction }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
      <img src={imageUrl} alt={title} className="w-full h-56 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-stone-800 mb-2">{title}</h3>
        <p className="text-stone-600 flex-grow">{description}</p>
        <button 
          onClick={onAction}
          className="mt-6 w-full bg-amber-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-amber-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          {actionText}
        </button>
      </div>
    </div>
  );
};

export default Card;
