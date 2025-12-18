import { Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

    return (
        <div className="flex flex-col sm:flex-row items-center bg-white p-4 mb-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 animate-fade-in">
            <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-contain mb-4 sm:mb-0 sm:mr-6"
            />

            <div className="flex-grow text-center sm:text-left mb-4 sm:mb-0">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{item.title}</h3>
                <p className="text-gray-500 text-sm capitalize">{item.category}</p>
                <p className="text-blue-600 font-bold mt-1">₹{item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-full">
                    <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
                        disabled={item.quantity <= 1}
                    >
                        <Minus size={16} className={item.quantity <= 1 ? "text-gray-300" : ""} />
                    </button>
                    <span className="px-2 font-medium w-8 text-center">{item.quantity}</span>
                    <button
                        onClick={() => increaseQuantity(item.id)}
                        className="p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
                    >
                        <Plus size={16} />
                    </button>
                </div>

                <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 transition-colors duration-200"
                    aria-label="Remove item"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    );
};

export default CartItem;
