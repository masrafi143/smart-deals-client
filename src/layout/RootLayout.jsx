import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div className='w-6xl mx-auto'>
            <Navbar/>
            <Outlet/>
            
        </div>
    );
};

export default RootLayout;