import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 flex flex-col h-full">
            <Link to={`/product/${product.id}`} className="block relative pt-[100%] overflow-hidden group">
                <img
                    src={product.image}
                    alt={product.title}
                    className="absolute top-0 left-0 w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                />
            </Link>
            <div className="p-4 flex flex-col flex-grow">
                <span className="text-xs text-blue-500 font-semibold uppercase tracking-wide mb-1">
                    {product.category}
                </span>
                <Link to={`/product/${product.id}`} className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                    {product.title}
                </Link>
                <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                        ₹{product.price.toFixed(2)}
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-200"
                        aria-label="Add to cart"
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
