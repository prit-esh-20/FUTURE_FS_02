const ORDERS_KEY = 'shopsphere_orders';

const getOrders = () => {
    const orders = localStorage.getItem(ORDERS_KEY);
    try {
        return orders ? JSON.parse(orders) : [];
    } catch (e) {
        return [];
    }
};

export const saveOrder = async (orderData) => {
    const orders = getOrders();
    const newOrder = {
        id: 'ORD-' + Date.now(),
        date: new Date().toISOString(),
        status: 'Confirmed',
        ...orderData
    };
    orders.unshift(newOrder); // Add to beginning
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return newOrder;
};

export const getUserOrders = async (userEmail) => {
    const orders = getOrders();
    return orders.filter(order => order.userEmail === userEmail);
};

export const getAllOrders = async () => {
    return getOrders();
};
