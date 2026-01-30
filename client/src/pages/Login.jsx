import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await login(formData);
        if (res.success) {
            navigate('/reviews'); // Redirect to reviews after login
        } else {
            setError(res.msg);
        }
    };

    return (
        <div className="page-content">
            <div className="contact" style={{ marginTop: '50px' }}>
                <div className="cyber-form">
                    <h3><span className="neon-text">SYSTEM</span> ACCESS</h3>
                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="sec">
                            <input
                                type="text"
                                name="username"
                                placeholder="USERNAME"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="sec">
                            <input
                                type="password"
                                name="password"
                                placeholder="PASSWORD"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button className="cyber-btn" style={{ width: '100%' }}>LOGIN</button>
                    </form>
                    <p style={{ textAlign: 'center', marginTop: '20px', color: '#888' }}>
                        No access code? <Link to="/register" style={{ color: 'cyan' }}>Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
