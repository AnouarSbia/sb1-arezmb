interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "مصباح مكتب عصري",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
    category: "مكتب"
  },
  {
    id: 2,
    title: "كرسي مريح",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=400",
    category: "أثاث"
  },
  {
    id: 3,
    title: "لوحة مفاتيح لاسلكية",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
    category: "إلكترونيات"
  },
  {
    id: 4,
    title: "مكتب قابل للتعديل",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400",
    category: "أثاث"
  },
  {
    id: 5,
    title: "فأرة لاسلكية",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    category: "إلكترونيات"
  },
  {
    id: 6,
    title: "خزانة ملفات",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400",
    category: "مكتب"
  }
];

export function getCategoryProducts(category: string | undefined): Product[] {
  if (!category) return [];
  return products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}