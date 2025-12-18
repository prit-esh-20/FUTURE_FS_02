const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedCategory === 'all'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
            >
                All
            </button>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors duration-200 ${selectedCategory === category
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
