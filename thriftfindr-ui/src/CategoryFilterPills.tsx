import React from 'react';

export interface StoreCategoryPill {
  name: string;
  icon?: React.ElementType; 
  active?: boolean;
  color?: 'pink' | 'teal' | string; 
  onClick?: (name: string) => void; 
}

interface CategoryFilterPillsProps {
  categories: StoreCategoryPill[];
  onPillClick?: (name: string) => void; 
}

const CategoryFilterPills: React.FC<CategoryFilterPillsProps> = ({ categories, onPillClick }) => {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
      {categories.map((category, index) => {
        let bgColor = 'bg-gray-100';
        let textColor = 'text-gray-600';
        let iconColor = 'text-gray-500';

        if (category.active) {
          if (category.color === 'pink') {
            bgColor = 'bg-pink-100';
            textColor = 'text-pink-700';
            iconColor = 'text-pink-600';
          } else if (category.color === 'teal') {
            bgColor = 'bg-teal-100';
            textColor = 'text-teal-700';
            iconColor = 'text-teal-600';
          } else if (category.color) { 
            bgColor = category.color.startsWith('bg-') ? category.color : `bg-${category.color}-100`;
            textColor = category.color.startsWith('text-') ? category.color.replace('bg-','text-').replace('-100','-700') : `text-${category.color}-700`;
            iconColor = category.color.startsWith('text-') ? category.color.replace('bg-','text-').replace('-100','-600') : `text-${category.color}-600`;
          }
        }
        const IconComponent = category.icon;

        return (
          <button 
            key={index} 
            onClick={() => onPillClick && onPillClick(category.name)}
            disabled={!onPillClick}
            className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium transition-colors hover:opacity-80 ${bgColor} ${textColor} ${!onPillClick ? 'cursor-default' : ''}`}
          >
            {IconComponent && <IconComponent size={16} className={iconColor} />}
            <span>{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilterPills; 