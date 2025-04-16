import React from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const CustomCard: React.FC<CardProps> = ({
  to,
  icon,
  title,
  description,
  onClick,
  className,
  disabled
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (disabled) return;
    if (onClick) {
      onClick();
    } else {
      navigate(to);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        bg-gradient-to-br from-white to-blue-50 
        p-8 
        rounded-2xl 
        shadow-lg 
        ${!disabled ? 'hover:shadow-2xl hover:scale-105' : ''} 
        transition-all 
        flex 
        flex-col 
        items-center 
        text-center 
        border border-gray-200 
        ${disabled ? 'cursor-not-allowed' : 'hover:border-blue-300'}
        ${className || ""}
      `}
    >
      <div className={`text-6xl mb-6 ${disabled ? 'text-gray-400' : 'text-blue-500'}`}>
        {icon}
      </div>
      <h3 className={`text-2xl font-bold mb-4 tracking-wide ${disabled ? 'text-gray-500' : 'text-gray-800'}`}>
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
    </div>
  );
};

export default CustomCard;