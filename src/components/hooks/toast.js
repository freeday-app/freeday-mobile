import React, { useState } from 'react';
import { Snackbar } from 'react-native-paper';

export default function useToast() {
    const [toast, setToast] = useState({
        visible: false,
        text: null
    });
    return {
        setToast,
        Toast: () => (
            <Snackbar
                visible={toast.visible}
                duration={2000}
                onDismiss={() => setToast({
                    visible: false,
                    text: null
                })}
            >
                {toast.text}
            </Snackbar>
        )
    };
}
