import { atom, computed } from 'nanostores';

export const cartStore = atom<Record<number, number>>({});

export const addToCart = (productId: number) => {
  cartStore.set({
    ...cartStore.get(),
    [productId]: (cartStore.get()[productId] || 0) + 1,
  });
};

export const removeFromCart = (productId: number) => {
  const cart = cartStore.get();
  const newCart = { ...cart };
  delete newCart[productId];
  cartStore.set(newCart);
};

export const getCartCount = computed(cartStore, (cart) => 
  Object.values(cart).reduce((acc, quantity) => acc + quantity, 0)
);