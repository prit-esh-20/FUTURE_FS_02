import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
            <footer className="bg-white border-t py-6 mt-auto">
                <div className="text-center text-gray-500">
                    &copy; {new Date().getFullYear()} ShopSphere. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
