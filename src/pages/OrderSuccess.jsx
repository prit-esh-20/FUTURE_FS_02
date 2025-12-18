import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';

const OrderSuccess = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in relative overflow-hidden">
            <Confetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={false}
                numberOfPieces={200}
            />
            <div className="mb-8 p-6 bg-green-100 rounded-full">
                <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Order Placed Successfully!</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-md">
                Thank you for your purchase. Your order is on its way.
            </p>
            <Link
                to="/"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
                Continue Shopping
            </Link>
        </div>
    );
};

export default OrderSuccess;
