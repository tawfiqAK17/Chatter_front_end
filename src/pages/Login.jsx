import { useContext, useState } from 'react';
import Axios from '../axios.config';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaComment } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic validation
        if (!email.trim() || !password.trim()) {
            setError('Please enter both email and password');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }
        const authenticated = await user_auth(email, password);
        if(authenticated) {
            navigate('/chat');
            return;
        } else {
            setError('The password or the email is invalid');
            return;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-secondary py-6 px-4 text-center">
                    <FaComment className="text-white text-4xl mx-auto mb-2" />
                    <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                    <p className="text-blue-100">Sign in to continue to ChatApp</p>
                </div>

                <div className="p-6">
                    {error && (
                        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
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
                                    onChange={(e) => { setEmail(e.target.value); setError("") }}
                                />
                            </div>
                        </div>

                        <div className="mb-6">
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
                                    onChange={(e) => { setPassword(e.target.value); setError("") } }
                                />
                            </div>
                            <div className="mt-1 text-right">
                                <a href="#" className="text-sm text-secondary hover:text-secondary-dark">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>

                        <div className="mb-6">
                            <button
                                type="submit"
                                className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50 transition duration-200 block text-center"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>

                    <div className="text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-secondary hover:text-secondary-dark font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
async function user_auth( email, password ) {
    const payload = {
        email: email,
        password: password 
    }
    try{
        const res = await Axios.post('/sign-in', payload); 
        if ( res.status === 200 ) {
            // store the authentication token in the session storage
            sessionStorage.setItem('jwt', JSON.stringify(res.data.jwt));
            return res.data.jwt ? true : false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

export default Login;
