import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';
import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                setError('Failed to load product details.');
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
            // Optional: Show a toast or feedback?
            // For now, maybe navigate to cart or stay? User didn't specify.
            // Usually stay. Navbar badge updates.
        }
    };

    const handleQuantityChange = (delta) => {
        setQuantity((prev) => Math.max(1, prev + delta));
    };

    if (loading) return <Loader />;
    if (error || !product) return <div className="text-center text-red-500 py-10">{error || 'Product not found'}</div>;

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-slide-in">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors p-6 pb-0"
            >
                <ArrowLeft size={20} className="mr-2" /> Back to Products
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 lg:p-10">
                <div className="flex items-center justify-center bg-gray-50 rounded-lg p-8">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-96 object-contain hover:scale-105 transition-transform duration-500"
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <span className="text-sm text-blue-500 font-bold uppercase tracking-wider mb-2">
                        {product.category}
                    </span>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                        {product.title}
                    </h1>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="flex items-center mb-8">
                        <span className="text-4xl font-bold text-gray-900">
                            ₹{product.price.toFixed(2)}
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="flex items-center border border-gray-300 rounded-full">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                className="p-3 text-gray-600 hover:text-blue-600 focus:outline-none"
                            >
                                <Minus size={20} />
                            </button>
                            <span className="px-4 font-semibold text-gray-900 w-12 text-center">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                className="p-3 text-gray-600 hover:text-blue-600 focus:outline-none"
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 transform hover:-translate-y-1 shadow-md hover:shadow-lg w-full sm:w-auto"
                        >
                            <ShoppingCart size={20} className="mr-2" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
