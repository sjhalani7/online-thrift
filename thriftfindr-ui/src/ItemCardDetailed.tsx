import React from 'react';


export interface ItemCardDetailedProps {
  id: number;
  imageUrl: string;
  name: string;
  price: string;
  descriptionTags: string; 
  description?: string;    
  onViewItemClick?: (item: ItemCardDetailedProps) => void;
}

const ItemCardDetailed: React.FC<ItemCardDetailedProps> = (
  { id, imageUrl, name, price, descriptionTags, description, onViewItemClick }
) => {
  
 
  const handleViewItemClick = () => {
    
    if (onViewItemClick) {
      onViewItemClick({ id, imageUrl, name, price, descriptionTags, description });
    }
  };

  return (
    <div className="font-inter flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative mb-2">
        <img 
          src={imageUrl || 'https://via.placeholder.com/300x350?text=Item+Image'} 
          alt={name} 
          className="w-full h-auto object-cover aspect-[4/5]"
        />
        {} 
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-md font-semibold text-brand-charcoal leading-tight line-clamp-2" title={name}>{name}</h3>
          <p className="text-md font-semibold text-brand-charcoal whitespace-nowrap pl-2">{price}</p>
        </div>
        
        <p className="text-xs text-brand-gray-medium mb-3 flex-grow line-clamp-2">
          {descriptionTags}
        </p>
        
        <div className="mt-auto flex flex-col space-y-2">
          <button 
            onClick={handleViewItemClick}
            className="w-full bg-brand-orange text-white py-2 px-3 rounded-md hover:bg-orange-600 transition-colors text-sm font-medium"
          >
            View Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCardDetailed; 