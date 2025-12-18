const USERS_KEY = 'shopsphere_users';
const CURRENT_USER_KEY = 'shopsphere_current_user';

// Mock Admin User
const ADMIN_USER = {
    id: 'admin_1',
    email: 'admin@shopsphere.com',
    password: 'admin', // In real app, hash this!
    name: 'Admin User',
    role: 'admin'
};

const getUsers = () => {
    const users = localStorage.getItem(USERS_KEY);
    try {
        return users ? JSON.parse(users) : [ADMIN_USER];
    } catch (e) {
        return [ADMIN_USER];
    }
};

export const loginUser = async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        const { password, ...userWithoutPass } = user;
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPass));
        return userWithoutPass;
    }
    throw new Error('Invalid email or password');
};

export const registerUser = async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = getUsers();
    if (users.find(u => u.email === userData.email)) {
        throw new Error('User already exists');
    }

    const newUser = {
        id: Date.now().toString(),
        role: 'user',
        ...userData
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const { password, ...userWithoutPass } = newUser;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPass));
    return userWithoutPass;
};

export const logoutUser = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = () => {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    try {
        return user ? JSON.parse(user) : null;
    } catch (e) {
        return null;
    }
};
