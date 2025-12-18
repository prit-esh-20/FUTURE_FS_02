import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/productService';
import { Plus, Edit, Trash2, X, Check, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
    });

    useEffect(() => {
        if (!isAdmin()) {
            navigate('/');
            return;
        }
        loadProducts();
    }, [user]);

    const loadProducts = async () => {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
            loadProducts();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, {
                    ...formData,
                    price: parseFloat(formData.price)
                });
            } else {
                await addProduct({
                    ...formData,
                    price: parseFloat(formData.price)
                });
            }
            setIsModalOpen(false);
            setEditingProduct(null);
            setFormData({ title: '', price: '', description: '', category: '', image: '' });
            loadProducts();
        } catch (error) {
            console.error('Failed to save product', error);
            alert('Failed to save product');
        }
    };

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Product Management</h1>
                <button
                    onClick={() => {
                        setEditingProduct(null);
                        setFormData({ title: '', price: '', description: '', category: '', image: '' });
                        setIsModalOpen(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} /> Add Product
                </button>
            </div>

            <div className="mb-6 relative">
                <Search className="absolute top-3 left-3 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="text-center py-10">Loading products...</div>
            ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <ul className="divide-y divide-gray-200">
                        {filteredProducts.map((product) => (
                            <li key={product.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="h-12 w-12 object-contain rounded bg-white border"
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 truncate max-w-xs sm:max-w-md">
                                            {product.title}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            ₹{product.price} | {product.category}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="text-blue-600 hover:text-blue-900 p-2"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="text-red-600 hover:text-red-900 p-2"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    step="0.01"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <input
                                    type="text"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                <input
                                    type="url"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    required
                                    rows="3"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {editingProduct ? 'Update Product' : 'Add Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
