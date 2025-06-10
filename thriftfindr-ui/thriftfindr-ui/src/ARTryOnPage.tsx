import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X as CloseIcon, Box, Sparkles } from 'lucide-react';


interface ARItemData {
  id: string | number;
  name: string;
  imageUrl: string;
}

const fakeARImageUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60';

const ARTryOnPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const itemForAR = location.state?.itemForAR as ARItemData | undefined;

  if (!itemForAR) {
    return (
      <div className="min-h-screen flex flex-col font-inter bg-gradient-to-br from-orange-100 via-rose-50 to-sky-100 text-brand-charcoal items-center justify-center p-4">
        <Sparkles size={48} className="text-purple-600 mb-4" />
        <h1 className="text-2xl font-bold text-brand-charcoal mb-2">No Item Selected for AR Try-On</h1>
        <p className="text-brand-gray-medium mb-6 text-center">
          Please select an item from its detail page to try it on in AR.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="bg-brand-orange text-white py-2.5 px-6 rounded-md hover:bg-orange-600 transition-colors font-medium"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-inter bg-gradient-to-br from-orange-100 via-rose-50 to-sky-100 text-brand-charcoal">
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col items-center">
        <section className="w-full flex justify-between items-start mb-8 md:mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-brand-charcoal mr-3">Try On: {itemForAR.name}</h1>
              <Sparkles size={32} className="text-purple-600" />
            </div>
            <p className="text-base text-brand-gray-medium">
              Enable your camera and experience "{itemForAR.name}" virtually!
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-gray-500 hover:text-brand-orange transition-colors"
            aria-label="Close AR view"
          >
            <CloseIcon size={28} />
          </button>
        </section>

        <section className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-3 md:p-4 flex flex-col overflow-hidden aspect-[9/19]">
          <div
            className="flex-grow bg-gray-800 rounded-2xl relative overflow-hidden mb-3 flex items-center justify-center"
          >
            <img
              src={fakeARImageUrl}
              alt={`AR view placeholder for ${itemForAR.name}`}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
              <button className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/30 backdrop-blur-sm p-1.5 group transition-transform hover:scale-105">
                <div className="w-full h-full rounded-full bg-white group-active:bg-gray-200 transition-colors"></div>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-1 md:p-2 bg-gray-50 rounded-xl">
            <button className="flex items-center space-x-1.5 py-2 px-3 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium text-brand-charcoal transition-colors">
              <Box size={18} />
              <span>3D</span>
            </button>
            <div className="flex-1 flex justify-center items-center p-1">
                <div
                  className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 border-brand-orange ring-2 ring-brand-orange/50 shadow-md`}
                  title={`Currently viewing: ${itemForAR.name}`}
                >
                  <img src={itemForAR.imageUrl} alt={itemForAR.name} className="w-full h-full object-cover" />
                </div>
            </div>
            <div className="w-[calc(18px+theme(spacing.1.5)+theme(spacing.3)+theme(fontSize.sm))]"></div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ARTryOnPage; 