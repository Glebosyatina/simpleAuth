import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../AuthService';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthService.register({ firstName, lastName, email, password });
            setMessage(response.data);
            if (response.data === 'User registered successfully') {
                navigate('/login');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setMessage(error.response?.data?.message || error.response?.data || 'Registration failed');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Registration</div>
                        <div className="card-body">
                            {message && <div className="alert alert-info">{message}</div>}
                            <form onSubmit={handleRegister}>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Register</button>
                            </form>
                            <div className="mt-3">
                                <span>Already registered? <Link to="/login">Login here</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;
