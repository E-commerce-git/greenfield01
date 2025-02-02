import dotenv from 'dotenv';
dotenv.config();


    const development={
        STRIPE_PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
        STRIPE_SECRET_KEY: import.meta.env.STRIPE_SECRET_KEY,
        VITE_PRODUCT: import.meta.env.VITE_PRODUCT,
        VITE_CLOUDINARY: import.meta.env.VITE_CLOUDINARY,
        VITE_CATEGORY: import.meta.env.VITE_CATEGORY,
        VITE_REVIEW: import.meta.env.VITE_REVIEW,
        VITE_RP: import.meta.env.VITE_RP,
        VITE_SEND: import.meta.env.VITE_SEND,
        VITE_PAYMMENT: import.meta.env.VITE_PAYMMENT,
    }


export default development