import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const Protected = ({ component: Component }) => {
    const storedUser = localStorage.getItem("firebaseUser");
    const navigate = useNavigate();

    useEffect(() => {
        if (!storedUser) {
            navigate('/signin');
        }
    }, [storedUser, navigate]);

    return storedUser ? 
    <>
    <Component />
    </>
     : null;
};

export default Protected;
