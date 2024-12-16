// components/Card.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  to: string; // Path to navigate when the card is clicked
  icon: React.ReactNode; // Icon or image for the card
  title: string; // Title of the card
  description: string; // Description of the card
}

const CustomCard: React.FC<CardProps> = ({ to, icon, title, description }) => {
  return (
    <Link
      to={to}
      className="
        bg-gradient-to-br from-white to-blue-50 
        p-8 
        rounded-2xl 
        shadow-lg 
        hover:shadow-2xl 
        transition-shadow 
        flex 
        flex-col 
        items-center 
        text-center 
        transform 
        hover:scale-105 
        transition-transform 
        border border-gray-200 
        hover:border-blue-300
      "
    >
      <div className="text-6xl mb-6 text-blue-500">{icon}</div>
      <h3 className="text-2xl font-bold mb-4 text-gray-800 tracking-wide">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed text-lg">
        {description}
      </p>
    </Link>
  );
};

export default CustomCard;