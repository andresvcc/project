import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';

export default class ToasConfig extends Component {
    render() {
        return (
            <ToastContainer
                position="top-center"
                autoClose={10000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />
        );
    }
}