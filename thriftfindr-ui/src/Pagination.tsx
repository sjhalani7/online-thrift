import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsName?: string; 
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, itemsName = "items" }) => {
  if (totalPages <= 1) {
    return null; 
  }


  const getPageNumbers = () => {
    const delta = 2;
    const left = currentPage - delta;
    const right = currentPage + delta + 1;
    const range = [];
    const rangeWithDots: (number | string)[] = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label={`Pagination for ${itemsName}`}>
      <ul className="inline-flex items-center -space-x-px text-sm">
        <li>
          <button 
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-brand-gray-medium bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-brand-charcoal disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span className="sr-only">Previous page of {itemsName}</span>
            <ChevronLeft size={16} />
          </button>
        </li>
        {pageNumbers.map((pageNumber, index) => (
          <li key={`page-${pageNumber}-${index}`}> 
            {pageNumber === '...' ? (
              <span className="flex items-center justify-center px-3 h-8 leading-tight text-brand-gray-medium bg-white border border-gray-300">
                ...
              </span>
            ) : (
              <button 
                onClick={() => onPageChange(pageNumber as number)}
                aria-current={currentPage === pageNumber ? 'page' : undefined}
                className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 transition-colors 
                  ${currentPage === pageNumber 
                    ? 'text-white bg-brand-orange border-brand-orange z-10' 
                    : 'text-brand-gray-medium bg-white hover:bg-gray-100 hover:text-brand-charcoal'}`}
              >
                {pageNumber}
              </button>
            )}
          </li>
        ))}
        <li>
          <button 
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center px-3 h-8 leading-tight text-brand-gray-medium bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-brand-charcoal disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span className="sr-only">Next page of {itemsName}</span>
            <ChevronRight size={16} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination; 