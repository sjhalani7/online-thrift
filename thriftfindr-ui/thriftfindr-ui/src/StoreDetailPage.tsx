import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ApiStore, ApiItem } from './apiTypes';
import { MapPin, Clock, ExternalLink, Search as SearchIcon, Shirt, Lamp, Disc, BookOpen } from 'lucide-react'; 
import ItemCardDetailed, { ItemCardDetailedProps } from './ItemCardDetailed';
import CategoryFilterPills, { StoreCategoryPill } from './CategoryFilterPills';
import Pagination from './Pagination';
import ItemDetailModal from './ItemDetailModal';
import NewItemModal from './NewItemModal';




const exampleItemCategories: StoreCategoryPill[] = [
  { name: 'Clothing', icon: Shirt, active: false }, 
  { name: 'Decor', icon: Lamp, active: false },
  { name: 'Music', icon: Disc, active: false },
  { name: 'Books', icon: BookOpen, active: false },
];

const StoreDetailPage: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const [store, setStore] = useState<ApiStore | null>(null);
  const [featuredItems, setFeaturedItems] = useState<ItemCardDetailedProps[]>([]);
  const [allItemsForDisplay, setAllItemsForDisplay] = useState<ItemCardDetailedProps[]>([]); 
  
  const [loadingStore, setLoadingStore] = useState(true);
  const [loadingItems, setLoadingItems] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentAllItemsPage, setCurrentAllItemsPage] = useState(1);
  const itemsPerPage = 8; 
  const [activeItemCategories, setActiveItemCategories] = useState<StoreCategoryPill[]>(exampleItemCategories);
  const [searchTerm, setSearchTerm] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState<ItemCardDetailedProps | null>(null);

  const storeDetailsFallbacks = {
    storeName: "Amazing Finds Thrift",
    address: "123 Vintage Lane, Thriftyville, TX",
    hours: "10 AM - 6 PM, Mon-Sat",
    description: "Your go-to place for unique second-hand treasures, from vintage clothing to classic homewares. Discover sustainable style and iconic pieces.",
    story: "Founded with a passion for pre-loved items, we aim to bring you a curated collection of the best thrift finds. Every item has a story, and we're excited to help you write its next chapter.",
    websiteUrl: "#", 
    storeImageUrl: 'https://via.placeholder.com/150?text=Store+Logo'
  };

  useEffect(() => {
    const fetchStoreAndItems = async () => {
      if (!storeId) return;
      setLoadingStore(true);
      setLoadingItems(true);
      setError(null);
      try {
        const storesResponse = await fetch('/api/stores');
        if (!storesResponse.ok) throw new Error(`Failed to fetch stores: ${storesResponse.status}`);
        const allStoresData: ApiStore[] = await storesResponse.json();
        const currentStore = allStoresData.find(s => s.id.toString() === storeId);

        if (!currentStore) {
          setError('Store not found.'); 
          setLoadingStore(false); 
          setLoadingItems(false); 
          return;
        }
        setStore(currentStore);
        setLoadingStore(false);

        const itemsResponse = await fetch(`/api/stores/${storeId}/items`);
        if (!itemsResponse.ok) throw new Error(`Failed to fetch items: ${itemsResponse.status}`);
        const itemsData: ApiItem[] = await itemsResponse.json();

        const formattedItemsForCards: ItemCardDetailedProps[] = itemsData.map(item => ({
          id: item.id,
          imageUrl: item.image_url || 'https://via.placeholder.com/300x300?text=Item',
          name: item.name,
          price: `$${item.price.toFixed(2)}`,
          descriptionTags: item.tags || 'No tags available',
          description: item.description || 'No detailed description available.',
        }));
        setFeaturedItems(formattedItemsForCards.slice(0, 4)); 
        setAllItemsForDisplay(formattedItemsForCards); 

      } catch (err) {
        if (err instanceof Error) setError(err.message); 
        else setError('An unknown error occurred.');
      } finally {
        setLoadingStore(false); 
        setLoadingItems(false);
      }
    };
    fetchStoreAndItems();
  }, [storeId]);

  const handleOpenModal = useCallback((item: ItemCardDetailedProps) => {
    setSelectedItemForModal(item);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedItemForModal(null);
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleCloseModal();
    };
    if (isModalOpen) document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isModalOpen, handleCloseModal]);

  const handleItemCategoryPillClick = (name: string) => {
    setActiveItemCategories(prev =>
      prev.map(cat => cat.name === name ? { ...cat, active: !cat.active } : cat)
    );
    setCurrentAllItemsPage(1); 
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentAllItemsPage(1); 
  };

  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);

  const handleSubmitNewItem = (itemData: {
    name: string;
    price: string;
    descriptionTags: string;
    description?: string;
    imageUrl: string;
  }) => {
    console.log("New item submitted:", itemData);
    // TODO: send itemData to your backend via POST
  };


  if (loadingStore) return <div className="text-center p-10 text-brand-gray-medium">Loading store details...</div>;
  if (error && !store) return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  if (!store) return <div className="text-center p-10 text-brand-gray-medium">Store not found or an error occurred.</div>;

  const filteredAndSearchedItems = allItemsForDisplay.filter(item => {
    const activeCatNames = activeItemCategories.filter(c => c.active).map(c => c.name.toLowerCase());
    const itemMatchesCategory = activeCatNames.length === 0 || 
                                (item.descriptionTags && activeCatNames.some(cn => item.descriptionTags.toLowerCase().includes(cn)));
    const itemMatchesSearch = searchTerm === '' || 
                              item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              (item.descriptionTags && item.descriptionTags.toLowerCase().includes(searchTerm.toLowerCase()));
    return itemMatchesCategory && itemMatchesSearch;
  });

  const totalAllItemsPages = Math.ceil(filteredAndSearchedItems.length / itemsPerPage);
  const paginatedAllItems = filteredAndSearchedItems.slice((currentAllItemsPage - 1) * itemsPerPage, currentAllItemsPage * itemsPerPage);

  return (
    <div className="bg-white font-inter text-brand-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <section 
          className="relative bg-gradient-to-r from-brand-orange via-orange-400 to-amber-300 text-white p-8 md:p-12 rounded-lg shadow-lg mb-12 md:mb-16 overflow-hidden"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center">
            <img 
                src={storeDetailsFallbacks.storeImageUrl} 
                alt={`${store.name || storeDetailsFallbacks.storeName} logo`} 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md object-cover mr-6 mb-4 md:mb-0 flex-shrink-0"
            />
            <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-1">{store.name || storeDetailsFallbacks.storeName}</h1>
                <div className="flex items-center text-sm opacity-90 mb-1">
                    <MapPin size={16} className="mr-1.5 flex-shrink-0" /> {store.address || storeDetailsFallbacks.address}
                </div>
                <div className="flex items-center text-sm opacity-90 mb-3">
                    <Clock size={16} className="mr-1.5 flex-shrink-0" /> Hours: {store.hours || storeDetailsFallbacks.hours}
                </div>
                <p className="text-sm opacity-90 max-w-2xl">
                    {storeDetailsFallbacks.description}
                </p>
            </div>
            <a 
                href={storeDetailsFallbacks.websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-4 md:mt-0 md:ml-6 bg-white text-brand-orange px-5 py-2.5 rounded-md font-semibold hover:bg-orange-50 transition-colors text-sm self-start md:self-center whitespace-nowrap flex items-center"
            >
                Visit Website <ExternalLink size={16} className="inline-block ml-2" />
            </a>
            <button
              onClick={() => setIsNewItemModalOpen(true)}
              className="mt-2 md:mt-2 md:ml-6 bg-white text-brand-charcoal px-5 py-2.5 rounded-md font-semibold hover:bg-gray-100 transition-colors text-sm self-start md:self-center whitespace-nowrap"
            >
              Your Store? List Items Here
            </button>

          </div>
        </section>

        <section className="py-8 md:py-12 bg-gray-50 rounded-lg shadow p-8 mb-12 md:mb-16">
          <h2 className="text-2xl font-semibold text-brand-charcoal mb-4">Our Story</h2>
          <p className="text-brand-gray-medium leading-relaxed">
            {storeDetailsFallbacks.story}
          </p>
        </section>

        <hr className="my-8 md:my-12 border-gray-200" />
        
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl font-semibold text-brand-charcoal mb-6">Featured Items</h2>
          {loadingItems ? (
            <p className="text-center text-brand-gray-medium py-4">Loading featured items...</p>
          ) : featuredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredItems.map(item => <ItemCardDetailed key={item.id} {...item} onViewItemClick={handleOpenModal} />)}
            </div>
          ) : (
            <p className="text-center text-brand-gray-medium py-4">No featured items available at this store currently.</p>
          )}
        </section>

        <hr className="my-8 md:my-12 border-gray-200" />

        <section>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-brand-charcoal">All Items ({filteredAndSearchedItems.length})</h2>
            <div className="relative w-full md:w-72">
                <input 
                    type="search"
                    placeholder="Search items... (e.g., jacket, tags)"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm"
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div className="mb-6">
            <CategoryFilterPills categories={activeItemCategories} onPillClick={handleItemCategoryPillClick} />
          </div>

          {loadingItems && paginatedAllItems.length === 0 && !searchTerm && activeItemCategories.every(c => !c.active) ? (
            <p className="text-center text-brand-gray-medium py-8">Loading items...</p>
          ) : !loadingItems && paginatedAllItems.length === 0 && searchTerm ? (
            <p className="text-center text-brand-gray-medium py-8">No items match "{searchTerm}". Try a different search or adjust category filters.</p>
          ) : !loadingItems && paginatedAllItems.length === 0 && activeItemCategories.some(c=>c.active) ? (
            <p className="text-center text-brand-gray-medium py-8">No items match the selected categories. Try clearing filters or searching.</p>
          ) : !loadingItems && paginatedAllItems.length === 0 ? (
            <p className="text-center text-brand-gray-medium py-8">No items available in this store currently.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {paginatedAllItems.map(item => <ItemCardDetailed key={item.id} {...item} onViewItemClick={handleOpenModal} />)}
            </div>
          )}
          
          {filteredAndSearchedItems.length > itemsPerPage && (
            <Pagination 
                currentPage={currentAllItemsPage} 
                totalPages={totalAllItemsPages} 
                onPageChange={setCurrentAllItemsPage} 
                itemsName="items" 
            />
          )}
        </section>
      </div>

      <NewItemModal
        isOpen={isNewItemModalOpen}
        onClose={() => setIsNewItemModalOpen(false)}
        onSubmit={handleSubmitNewItem}
      />

      <ItemDetailModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        item={selectedItemForModal} 
      />
    </div>
  );
};

export default StoreDetailPage; 