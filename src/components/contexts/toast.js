import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from 'react-native-paper';

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState('');
    const showToast = (toastText) => {
        setText(toastText);
        setVisible(true);
    };
    return (
        <ToastContext.Provider value={{ showToast }}>
            <Snackbar
                visible={visible}
                duration={2000}
                onDismiss={() => setVisible(false)}
            >
                {text}
            </Snackbar>
            {children}
        </ToastContext.Provider>
    );
}

ToastProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ]).isRequired
};

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within an ToastProvider');
    }
    return context;
}
