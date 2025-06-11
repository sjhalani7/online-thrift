import React, { useState, useEffect } from 'react';
import { MapPin, Search, Star, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Shirt, Disc, BookOpen, Lamp } from 'lucide-react';
import StoreCard from './StoreCard';
import { ApiStore } from './apiTypes';
import CategoryFilterPills, { StoreCategoryPill } from './CategoryFilterPills';
import Pagination from './Pagination';


interface StoreCategory {
  name: string;
  icon?: React.ElementType;
  active?: boolean;
  color?: string; 
}

const initialCategoriesData: StoreCategoryPill[] = [
  { name: 'Clothes', icon: Shirt, active: true, color: 'pink' },
  { name: 'Antique Decor', icon: Lamp, active: true, color: 'teal' },
  { name: 'Vinyl & Music', icon: Disc }, 
  { name: 'Books', icon: BookOpen },

];


interface DisplayStoreData {
  id: number;
  name: string;
  imageUrl: string; 
  distance: string; 
  address: string;
  categories: { name: string; color?: string }[];
  description: string; 
}

const StoreListingPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [stores, setStores] = useState<DisplayStoreData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategories, setActiveCategories] = useState<StoreCategoryPill[]>(initialCategoriesData);


  const storesPerPage = 9;
  const totalStoresFromServer = 20; 
  const totalPages = Math.ceil(totalStoresFromServer / storesPerPage);

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/stores');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const apiStoresData: ApiStore[] = await response.json();
        
        const formattedStores: DisplayStoreData[] = apiStoresData.map(store => ({
          id: store.id,
          name: store.name,
          address: store.address,

          imageUrl: store.image_url || `https://picsum.photos/seed/${store.id}/400/250`,
          distance: 'N/A', 
          categories: [{ name: 'General' }],
          description: `Hours: ${store.hours}. Visit us for great finds!` 
        }));

        setStores(formattedStores);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred while fetching stores.");
        }
        console.error("Failed to fetch stores:", err);
      }
      setLoading(false);
    };

    fetchStores();
  }, []);

  const handleCategoryPillClick = (name: string) => {

    console.log("Category pill clicked:", name);

    setActiveCategories(prev => 
      prev.map(cat => cat.name === name ? { ...cat, active: !cat.active } : cat)
    );
  };


  const paginatedStores = stores.slice((currentPage - 1) * storesPerPage, currentPage * storesPerPage);

  return (

    <div className="font-inter text-brand-charcoal"> 
      {}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {}
        <section className="mb-8 p-6 bg-white rounded-lg shadow">
          {}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-brand-orange" />
              <input 
                type="text" 
                value="95050" 
                disabled 
                className="bg-gray-100 text-brand-gray-medium p-2 rounded-md border-gray-300 focus:ring-0 focus:border-gray-300 w-24 text-center"
              />
              <button className="bg-brand-orange text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-orange-600 transition-colors">
                Change
              </button>
            </div>
            <div className="flex items-center gap-2 text-brand-gray-medium">
              <Star size={18} className="text-gray-400" /> 
              <span>Distance</span>
              <select className="p-2 border-gray-300 rounded-md text-sm focus:ring-brand-orange focus:border-brand-orange">
                <option>5 mi</option>
                <option>10 mi</option>
                <option>25 mi</option>
                <option>50 mi</option>
              </select>
            </div>
          </div>
          {}
          <div className="relative">
            <input 
              type="search" 
              placeholder="Search for stores..." 
              className="w-full p-4 pr-12 border-gray-300 rounded-md focus:ring-brand-orange focus:border-brand-orange text-brand-gray-medium placeholder-gray-400"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
          </div>
        </section>

        {}
        <section className="mb-8">
          <CategoryFilterPills categories={activeCategories} onPillClick={handleCategoryPillClick} />
        </section>

        {}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-brand-charcoal">Nearby Stores</h2>
            <div className="flex items-center gap-2 text-brand-gray-medium text-sm">
              <span>Sort by:</span>
              <select className="p-2 border-gray-300 rounded-md text-sm focus:ring-brand-orange focus:border-brand-orange">
                <option>Distance</option>
                <option>Rating</option>
                <option>Newest</option>
              </select>
            </div>
          </div>
          {}
          {loading && <p className="text-center text-brand-gray-medium">Loading stores...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}
          {!loading && !error && paginatedStores.length === 0 && (
            <p className="text-center text-brand-gray-medium">No stores found.</p>
          )}
          {!loading && !error && paginatedStores.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedStores.map(store => (
                <StoreCard 
                  key={store.id} 
                  id={store.id}
                  name={store.name}
                  imageUrl={store.imageUrl}
                  distance={store.distance}
                  address={store.address}
                  categories={store.categories}
                  description={store.description}
                />
              ))}
            </div>
          )}
        </section>

        {}
        { !loading && !error && stores.length > storesPerPage && (
          <section className="mt-12 flex justify-center">
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
              itemsName="stores"
            />
          </section>
        )}

      </main>

      {}
    </div>
  );
};

export default StoreListingPage; 