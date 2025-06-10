import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StoreCardProps {
  id: number;
  name: string;
  imageUrl: string;
  distance: string;
  address: string;
  categories: { name: string; color?: string }[]; 
  description: string;
}

const StoreCard: React.FC<StoreCardProps> = ({ id, name, imageUrl, distance, address, categories, description }) => {

  const getCategoryPillClasses = (color?: string) => {
    switch (color) {
      case 'pink':
        return 'bg-pink-100 text-pink-700';
      case 'teal':
        return 'bg-teal-100 text-teal-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      <img 
        src={imageUrl || 'https://via.placeholder.com/400x250?text=Store+Image'} 
        alt={`Image of ${name}`} 
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-brand-charcoal mb-1">{name}</h3>
        <p className="text-sm text-brand-gray-medium mb-2">{distance} - {address}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((cat, index) => (
            <span 
              key={index} 
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryPillClasses(cat.color)}`}
            >
              {cat.name}
            </span>
          ))}
        </div>
        
        <p className="text-base text-brand-gray-medium mb-4 line-clamp-3 flex-grow">
          {description}
        </p>
        
        <div className="mt-auto pt-3 border-t border-gray-200">
          <Link 
            to={`/stores/${id}`}
            className="flex items-center text-sm text-brand-gray-medium hover:text-brand-orange transition-colors font-medium"
          >
            <ExternalLink size={16} className="mr-1.5" />
            View Store
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoreCard; 