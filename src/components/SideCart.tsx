import { useStore } from '@nanostores/react';
import { cartStore, removeFromCart } from '../stores/cartStore';
import { useEffect } from 'react';
import { getAllProducts } from '../utils/products';
import { trackPurchase } from '../utils/pixel';
import { useTranslation } from 'react-i18next';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const products = Object.fromEntries(
  getAllProducts().map(product => [product.id, product])
);

export default function SideCart({ isOpen, onClose }: Props) {
  const { t } = useTranslation();
  const $cart = useStore(cartStore);

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

  const total = Object.entries($cart).reduce((sum, [productId, quantity]) => {
    const product = products[productId as keyof typeof products];
    return sum + (product?.price ?? 0) * quantity;
  }, 0);

  const handleCheckout = () => {
    const cartItems = Object.entries($cart).map(([productId, quantity]) => ({
      id: Number(productId),
      quantity
    }));
    trackPurchase(total, cartItems);
    cartStore.set({});
    window.location.href = '/thank-you';
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{t('common.cart')}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label={t('common.close')}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {Object.entries($cart).length === 0 ? (
              <p className="text-gray-500 text-center py-8">{t('common.emptyCart')}</p>
            ) : (
              <ul className="space-y-4">
                {Object.entries($cart).map(([productId, quantity]) => {
                  const product = products[productId as keyof typeof products];
                  if (!product) return null;

                  return (
                    <li key={productId} className="flex gap-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{product.title}</h3>
                        <p className="text-gray-500">{t('common.quantity')}: {quantity}</p>
                        <p className="font-medium">{product.price} دج</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(Number(productId))}
                        className="text-red-500 hover:text-red-600"
                        aria-label={t('common.remove')}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="border-t p-4">
            <div className="flex justify-between text-lg font-semibold mb-4">
              <span>{t('common.total')}</span>
              <span>{total.toFixed(2)} دج</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              disabled={Object.keys($cart).length === 0}
            >
              {t('common.checkout')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}