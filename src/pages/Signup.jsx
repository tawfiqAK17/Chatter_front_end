import { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaComment } from 'react-icons/fa';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError('Please fill in all fields');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        // Password length validation
        if (password.length < 1) {
            setError('Password must be at least 6 characters long');
            return;
        }

        // Password match validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const authenticated = await sign_up(email, password, name);
        if (authenticated) {
            navigate('/chat');
        } else {
            setError('the email is already used');
        }

    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-secondary py-6 px-4 text-center">
                    <FaComment className="text-white text-4xl mx-auto mb-2" />
                    <h2 className="text-2xl font-bold text-white">Create Account</h2>
                    <p className="text-blue-100">Join ChatApp today</p>
                </div>

                <div className="p-6">
                    {error && (
                        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="text-gray-400" />
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => {setName(e.target.value); setError("")}}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => {setEmail(e.target.value); setError("");}}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => {setPassword(e.target.value); setError("");}}
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => {setConfirmPassword(e.target.value); setError("");}}
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <button type='submit'
                                className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50 transition duration-200 block text-center"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>

                    <div className="text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-secondary hover:text-secondary-dark font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};


async function sign_up(email, password, name) {
    try {
        const res = await axios.post(import.meta.env.VITE_SERVER_URL + '/sign-up', {
            name: name, 
            email: email,
            password: password
        }, {
                withCredentials: true,
            });
        if ( res.status === 201 ) {
            sessionStorage.setItem('jwt', res.data.jwt);
            return res.data.authenticated;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

export default Signup;
