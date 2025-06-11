import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Store, Sparkles, Search, ChevronLeft, ChevronRight, ShoppingBag, Info } from 'lucide-react';
import { ApiItem } from './apiTypes'; 
import StoreRegistrationPage from './StoreRegistrationPage'

interface ItemCardProps {
  id: number;
  imageUrl: string;
  name: string;
  price: string;
  storeName: string; 
}

const ItemCard: React.FC<ItemCardProps> = ({ imageUrl, name, price, storeName }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-64 flex-shrink-0 mr-4 font-inter">
      <img src={imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-brand-charcoal truncate">{name}</h3>
        <p className="text-brand-orange font-medium">{price}</p>
        {storeName && <p className="text-sm text-brand-gray-medium">{storeName}</p>}
      </div>
    </div>
  );
};


const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [freshlyFoundItems, setFreshlyFoundItems] = useState<ItemCardProps[]>([]);
  const [loadingFreshlyFound, setLoadingFreshlyFound] = useState(true);
  const [errorFreshlyFound, setErrorFreshlyFound] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchItems = async () => {
      setLoadingFreshlyFound(true);
      setErrorFreshlyFound(null);
      try {
        const response = await fetch(`/api/stores/1/items`); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ApiItem[] = await response.json();
        
        const formattedForCards: ItemCardProps[] = data.map(item => ({
          id: item.id,
          imageUrl: item.image_url,
          name: item.name,
          price: `$${item.price.toFixed(2)}`,
          storeName: `Store ID: ${item.store_id}` 
        }));
        setFreshlyFoundItems(formattedForCards.slice(0, 5)); // Take first 5 for carousel
      } catch (err) {
        if (err instanceof Error) {
            setErrorFreshlyFound(err.message);
        } else {
            setErrorFreshlyFound("An unknown error occurred");
        }
        console.error("Failed to fetch freshly found items:", err);
      }
      setLoadingFreshlyFound(false);
    };

    fetchItems();
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth -1); // -1 for pixel rounding issues
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      handleScroll();
      container.addEventListener('scroll', handleScroll);
      setShowRightArrow(container.scrollWidth > container.clientWidth);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [freshlyFoundItems]); 

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleDiscoverSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/stores');
  };

  return (
    <>
      <section className="relative bg-gradient-to-r from-hero-gradient-from to-hero-gradient-to text-brand-charcoal py-20 md:py-32 font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-hero-gradient-from to-hero-gradient-to rounded-2xl md:rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="p-8 md:p-12 lg:p-16 text-center md:text-left">
                <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-brand-charcoal leading-tight">
                  Discover Thrift & Vintage <span className="text-brand-orange">Stores</span> Near You
                </h1>
                <p className="mt-4 text-lg text-brand-gray-medium max-w-xl mx-auto md:mx-0">
                  Shop unique, sustainable finds from local thrift and vintage stores. Browse inventory, find bargains, and support small businesses in your neighborhood!
                </p>
                <div className="mt-8 max-w-lg mx-auto md:mx-0">
                  <form onSubmit={handleDiscoverSubmit} className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
                    <input
                      type="text"
                      placeholder="Enter your city or ZIP code"
                      className="flex-grow p-4 border-none focus:ring-0 text-brand-gray-medium placeholder-gray-400"
                    />
                    <button 
                      type="submit"
                      className="bg-brand-orange text-white font-semibold py-4 px-6 hover:bg-orange-600 transition-colors flex items-center"
                    >
                      <MapPin size={20} className="mr-2" /> 
                      Start Discovering
                    </button>
                  </form>
                </div>
                <div className="mt-6 flex items-center justify-center md:justify-start">
                  <div className="flex -space-x-2 overflow-hidden mr-2">
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1558531304-a47533da6380?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Store logo 1"/>
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Store logo 2"/>
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Store logo 3"/>
                  </div>
                  <p className="text-sm text-brand-gray-medium">+ 150 stores listed</p>
                </div>
              </div>
              {/* Illustration Column */}
              <div className="hidden md:flex items-center justify-center p-8 h-full">
                {/* Placeholder for Illustration */}
                {/* <div className="bg-orange-100 w-full h-64 md:h-full rounded-lg flex items-center justify-center text-orange-400">
                  <p className="text-2xl">Illustration Placeholder</p>
                </div> */}
                <img 
                  src="/images/thrift-shop-illustration.jpg" 
                  alt="Thrift shop illustration" 
                  className="w-full h-auto max-h-[400px] object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-semibold text-3xl md:text-4xl text-brand-charcoal">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-brand-gray-medium max-w-2xl mx-auto">
              Find your new favorite thrift or vintage shop in 3 simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-how-it-works-orange-bg mb-6">
                <MapPin size={36} className="text-brand-orange" strokeWidth={2.5} fill="currentColor" />
              </div>
              <h3 className="text-xl font-semibold text-brand-charcoal mb-2">Set Your Location</h3>
              <p className="text-base text-brand-gray-medium">
                Enter your city or allow location access to discover hidden gems around you.
              </p>
            </div>
            {}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-how-it-works-blue-bg mb-6">
                {}
                <Store size={36} className="text-blue-500" strokeWidth={2.5} fill="currentColor" /> 
              </div>
              <h3 className="text-xl font-semibold text-brand-charcoal mb-2">Browse Stores & Items</h3>
              <p className="text-base text-brand-gray-medium">
                Explore curated collections, new arrivals, and unique pieces from local shops.
              </p>
            </div>
            {}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-how-it-works-purple-bg mb-6">
                <ShoppingBag size={36} className="text-purple-500" strokeWidth={2.5} fill="currentColor" />
              </div>
              <h3 className="text-xl font-semibold text-brand-charcoal mb-2">Find Your Next Treasure</h3>
              <p className="text-base text-brand-gray-medium">
                Visit the store, grab a bargain, and cherish your unique, sustainable find.
              </p>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="bg-gradient-to-r from-cta-gradient-from to-cta-gradient-to py-16 md:py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-cta-gradient-from to-cta-gradient-to rounded-2xl md:rounded-3xl shadow-xl p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {}
              <div className="text-center md:text-left">
                <h2 className="font-semibold text-3xl md:text-4xl text-white">
                  Want to list your store?
                </h2>
                <p className="mt-4 text-lg text-cta-text-light max-w-xl mx-auto md:mx-0">
                  Join a growing community of local thrift and vintage businesses. Add your shop and reach thousands of shoppers nearby.
                </p>
              </div>
              {}
              <div className="text-center md:text-right">
                <a 
                  href="#contact-us" 
                  className="inline-block bg-white text-brand-charcoal font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-100 transition-colors text-lg"
                >
                 <button 
                    onClick={() => setIsModalOpen(true)}
                    className="inline-block bg-white text-brand-charcoal font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-100 transition-colors text-lg"
                  >
                    List Your Store &rarr;
                  </button>

                  <StoreRegistrationPage isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
    </>
  );
};

export default HomePage; 