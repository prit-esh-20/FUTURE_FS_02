import { fetchProducts as fetchApiProducts } from './api';

const PRODUCTS_KEY = 'shopsphere_products';

// Initialize products in local storage if not present
const initializeProducts = async () => {
    const existing = localStorage.getItem(PRODUCTS_KEY);
    try {
        if (existing) {
            return JSON.parse(existing);
        }
    } catch (e) {
        console.error("Failed to parse products from local storage", e);
        localStorage.removeItem(PRODUCTS_KEY);
    }

    try {
        const apiProducts = await fetchApiProducts();
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(apiProducts));
        return apiProducts;
    } catch (error) {
        console.error("Failed to seed products", error);
        return [];
    }
};

export const getProducts = async () => {
    return await initializeProducts();
};

export const getProductById = async (id) => {
    const products = await getProducts();
    // API IDs are numbers, new local IDs might be strings/UUIDs, so loose comparison or string conversion is safer
    return products.find(p => p.id.toString() === id.toString());
};

export const addProduct = async (product) => {
    const products = await getProducts();
    const newProduct = {
        ...product,
        id: Date.now(), // Simple ID generation
        rating: { rate: 0, count: 0 }
    };
    const updatedProducts = [newProduct, ...products];
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts));
    return newProduct;
};

export const updateProduct = async (id, updates) => {
    const products = await getProducts();
    const updatedProducts = products.map(p =>
        p.id.toString() === id.toString() ? { ...p, ...updates } : p
    );
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts));
    return updatedProducts.find(p => p.id.toString() === id.toString());
};

export const deleteProduct = async (id) => {
    const products = await getProducts();
    const updatedProducts = products.filter(p => p.id.toString() !== id.toString());
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts));
    return true;
};

export const getCategories = async () => {
    const products = await getProducts();
    const categories = [...new Set(products.map(p => p.category))];
    return categories;
};
