import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut, Package, Settings } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
    const { getTotalItems } = useCart();
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsProfileOpen(false);
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                        ShopSphere
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                            Home
                        </Link>

                        {isAdmin() && (
                            <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center gap-1">
                                <Settings size={18} /> Admin
                            </Link>
                        )}

                        <div className="relative">
                            <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 transition-colors">
                                <ShoppingCart size={24} />
                                {getTotalItems() > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                                        {getTotalItems()}
                                    </span>
                                )}
                            </Link>
                        </div>

                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium focus:outline-none"
                                >
                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <User size={18} />
                                    </div>
                                    <span>{user.name}</span>
                                </button>

                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                                        <Link
                                            to="/orders"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            <Package size={16} /> Order History
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                                        >
                                            <LogOut size={16} /> Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                                    Login
                                </Link>
                                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-4">
                        <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 transition-colors">
                            <ShoppingCart size={24} />
                            {getTotalItems() > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {getTotalItems()}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>

                        {isAdmin() && (
                            <Link
                                to="/admin"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Admin Dashboard
                            </Link>
                        )}

                        {user ? (
                            <>
                                <Link
                                    to="/orders"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Order History
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50"
                                >
                                    Sign out ({user.name})
                                </button>
                            </>
                        ) : (
                            <div className="border-t border-gray-100 pt-2 mt-2 space-y-1">
                                <Link
                                    to="/login"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-gray-50"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
