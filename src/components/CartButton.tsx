import { useStore } from '@nanostores/react';
import { cartStore, getCartCount } from '../stores/cartStore';
import { useState, useEffect } from 'react';
import SideCart from './SideCart';
import { useTranslation } from 'react-i18next';

export default function CartButton() {
  const { t } = useTranslation();
  const $cartCount = useStore(getCartCount);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button 
        className="relative p-2"
        onClick={() => setIsOpen(true)}
        aria-label={t('common.cart')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {mounted && $cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {$cartCount}
          </span>
        )}
      </button>

      <SideCart 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}