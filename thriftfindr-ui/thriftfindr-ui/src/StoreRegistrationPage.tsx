import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface StoreRegistrationPageProps {
    isOpen: boolean;
    onClose: () => void;
}

const StoreRegistrationPage: React.FC<StoreRegistrationPageProps> = ({ isOpen, onClose }) => {
    const [storeData, setStoreData] = useState({
        name: '',
        address: '',
        hours: '',
        description: '',
        story: '',
    });


    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
        return () => {
        document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setStoreData({ ...storeData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Store submitted:', storeData);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            role="dialog"
            aria-modal="true"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden font-inter"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Gradient header similar to homepage CTA */}
                <div className="bg-gradient-to-r from-cta-gradient-from to-cta-gradient-to px-6 py-6 relative">
                    <h2 className="text-3xl font-semibold text-white text-center">Register Your Storefront</h2>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white hover:text-gray-200"
                        aria-label="Close"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form content with consistent spacing and styling */}
                <form onSubmit={handleSubmit} className="p-6 flex flex-col items-center text-center space-y-4 bg-white">
                    <input
                        type="text"
                        name="name"
                        placeholder="Store Name"
                        value={storeData.name}
                        onChange={handleChange}
                        className="w-full md:w-11/12 p-3 border border-gray-300 rounded-md focus:ring-brand-orange focus:border-brand-orange"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={storeData.address}
                        onChange={handleChange}
                        className="w-full md:w-11/12 p-3 border border-gray-300 rounded-md focus:ring-brand-orange focus:border-brand-orange"
                        required
                    />
                    <input
                        type="text"
                        name="hours"
                        placeholder="Operating Hours"
                        value={storeData.hours}
                        onChange={handleChange}
                        className="w-full md:w-11/12 p-3 border border-gray-300 rounded-md focus:ring-brand-orange focus:border-brand-orange"
                    />
                    <textarea
                        name="description"
                        placeholder="Store Description"
                        value={storeData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full md:w-11/12 p-3 border border-gray-300 rounded-md focus:ring-brand-orange focus:border-brand-orange"
                    />
                    <textarea
                        name="story"
                        placeholder="Our Story"
                        value={storeData.story}
                        onChange={handleChange}
                        rows={4}
                        className="w-full md:w-11/12 p-3 border border-gray-300 rounded-md focus:ring-brand-orange focus:border-brand-orange"
                    />
                    <button
                        type="submit"
                        className="mt-2 bg-brand-orange text-white font-semibold px-6 py-2 rounded-md hover:bg-orange-600 transition"
                    >
                        Submit Storefront
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StoreRegistrationPage;
