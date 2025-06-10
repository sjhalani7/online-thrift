import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Ruler, Tag as TagIcon, Shirt as TryOnIcon, Sparkles } from 'lucide-react';
import { ItemCardDetailedProps } from './ItemCardDetailed';

interface ItemDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ItemCardDetailedProps | null;
}

const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ isOpen, onClose, item }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !item) {
    return null;
  }

  console.log('Item data in modal:', item);

  const allTags = item.descriptionTags ? item.descriptionTags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
  const modalTopTags = [
    { name: allTags[0] || 'Vintage', bgColor: 'bg-pink-100', textColor: 'text-pink-700' },
    { name: allTags[1] || 'Fashion', bgColor: 'bg-indigo-100', textColor: 'text-indigo-700' },
  ].filter(tag => tag.name);

  const categoryInfoPill = allTags[2] || 'Style';

  const handleTryMeOnClick = () => {
    if (item) {
      navigate('/try-on-ar', {
        state: {
          itemForAR: {
            id: item.id,
            name: item.name,
            imageUrl: item.imageUrl,
            description: item.description,
            price: item.price,
            tags: item.descriptionTags
          }
        }
      });
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 transition-opacity duration-300 ease-in-out antd-modal-mask-firefox-fix"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="item-detail-modal-title"
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden relative transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalAppear"
        onClick={(e) => e.stopPropagation()}
      >
        <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-20 p-1 bg-white/50 hover:bg-white rounded-full md:top-3 md:right-3"
            aria-label="Close item details"
        >
            <X size={20} />
        </button>

        <div className="w-full md:w-3/5 h-64 md:h-full flex-shrink-0 bg-gray-100">
          <img
            src={item.imageUrl || 'https://via.placeholder.com/600x800?text=Item+Image'}
            alt={item.name}
            className="w-full h-full object-cover md:rounded-l-xl"
          />
        </div>

        <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col overflow-y-auto">
          <div className="flex flex-wrap gap-2 mb-3">
            {modalTopTags.map(tag => (
              <span key={tag.name} className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${tag.bgColor} ${tag.textColor}`}>
                {tag.name}
              </span>
            ))}
          </div>

          <h2 id="item-detail-modal-title" className="text-2xl md:text-3xl font-bold text-brand-charcoal mb-2">{item.name}</h2>
          <p className="text-xl md:text-2xl font-bold text-brand-charcoal mb-3">{item.price}</p>

          <div className="flex items-center text-green-600 font-medium text-sm mb-4">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
            In stock
          </div>

          <div className="text-sm text-brand-gray-medium mb-6 flex-grow prose prose-sm max-w-none">
            <p className="font-semibold text-brand-charcoal">Description:</p>
            <p>{item.description || 'No detailed description available. Please see tags for more info.'}</p>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-200 space-y-4">
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="flex items-center bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                <Ruler size={16} className="mr-1.5 text-gray-500 flex-shrink-0" /> Size: M
              </span>
              <span className="flex items-center bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                <TagIcon size={16} className="mr-1.5 text-gray-500 flex-shrink-0" /> {categoryInfoPill}
              </span>
            </div>

            <button
              onClick={handleTryMeOnClick}
              className="w-full flex items-center justify-center bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors text-base font-medium shadow-md hover:shadow-lg"
            >
              <Sparkles size={18} className="mr-2" />
              TRY ME ON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailModal; 