import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css"

export const showMessagePopup = (message, color) => {
    Toastify({
        text: message,
        duration: 2000,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            background: `linear-gradient(to right, ${color}, ${color})`,
        },
    }).showToast();
}