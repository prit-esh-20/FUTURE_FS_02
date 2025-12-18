const BASE_URL = 'https://fakestoreapi.com';
const CONVERSION_RATE = 83;

// Helper to convert price to INR
const convertProduct = (product) => ({
    ...product,
    price: product.price * CONVERSION_RATE
});

export const fetchProducts = async () => {
    const response = await fetch(`${BASE_URL}/products`);
    const data = await response.json();
    return data.map(convertProduct);
};

export const fetchProductById = async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    const data = await response.json();
    return convertProduct(data);
};

export const fetchCategories = async () => {
    const response = await fetch(`${BASE_URL}/products/categories`);
    return response.json();
};

export const fetchProductsByCategory = async (category) => {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    const data = await response.json();
    return data.map(convertProduct);
};
