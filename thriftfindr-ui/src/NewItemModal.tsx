import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface NewItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (item: {
        name: string;
        price: string;
        descriptionTags: string;
        description?: string;
        imageUrl: string;
    }) => void;
}

const NewItemModal: React.FC<NewItemModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        descriptionTags: '',
        description: '',
        imageUrl: '',
    });

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => {
        document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
        setFormData({ name: '', price: '', descriptionTags: '', description: '', imageUrl: '' });
    };

    if (!isOpen) return null;

    return (
        <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        >
        <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 font-inter relative"
            onClick={(e) => e.stopPropagation()}
        >
            <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            aria-label="Close"
            >
            <X size={24} />
            </button>

            <h2 className="text-2xl font-semibold text-brand-charcoal text-center mb-6">
            Add a New Item
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="name"
                placeholder="Item Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
            />
            <input
                type="number"
                name="price"
                placeholder="Price (e.g. 29.99)"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
            />
            <input
                type="text"
                name="descriptionTags"
                placeholder="Tags (comma-separated)"
                value={formData.descriptionTags}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
            />
            <textarea
                name="description"
                placeholder="Description (optional)"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
            />
            <button
                type="submit"
                className="w-full mt-4 bg-brand-orange text-white py-3 rounded-md hover:bg-orange-600 transition font-semibold"
            >
                Submit Item
            </button>
            </form>
        </div>
        </div>
    );
};

export default NewItemModal;