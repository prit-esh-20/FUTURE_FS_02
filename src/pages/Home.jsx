import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../services/productService';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [productsData, categoriesData] = await Promise.all([
                    getProducts(),
                    getCategories(),
                ]);
                setProducts(productsData);
                setCategories(categoriesData);
            } catch (err) {
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (error) {
        return <div className="text-center text-red-500 py-10">{error}</div>;
    }

    return (
        <div className="fade-in">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    Welcome to ShopSphere
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Discover the latest trends in electronics, fashion, and more.
                </p>
            </div>

            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {!loading && (
                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            )}

            {loading ? (
                <Loader />
            ) : (
                <>
                    {filteredProducts.length === 0 ? (
                        <div className="text-center text-gray-500 py-12">
                            No products found matching your criteria.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
