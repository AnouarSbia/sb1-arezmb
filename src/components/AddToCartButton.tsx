import { useState } from 'react';
import { addToCart } from '../stores/cartStore';
import { trackAddToCart } from '../utils/pixel';
import { useTranslation } from 'react-i18next';

interface AddToCartButtonProps {
  productId: number;
  price: number;
}

export default function AddToCartButton({ productId, price }: AddToCartButtonProps) {
  const { t } = useTranslation();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(productId);
    trackAddToCart(productId, price);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`w-full py-3 px-8 rounded-lg font-semibold transition ${
        isAdding
          ? 'bg-green-500 text-white'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {isAdding ? t('common.addedToCart') : t('common.addToCart')}
    </button>
  );
}