import React, {
    createContext,
    useState,
    useContext,
    useMemo
} from 'react';
import { Snackbar } from 'react-native-paper';

import Types from '../../helpers/types.js';

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState('');
    const showToast = (toastText) => {
        setText(toastText);
        setVisible(true);
    };
    const contextValue = useMemo(() => ({
        showToast
    }), [
        showToast
    ]);
    return (
        <ToastContext.Provider value={contextValue}>
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
    children: Types.children.isRequired
};

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within an ToastProvider');
    }
    return context;
}
