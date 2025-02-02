const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import axios from 'axios';
// Helper function to construct URLs
const createUrl = (endpoint, path = '') => `${BASE_URL}${endpoint}${path}`;

// Helper function for authenticated headers
const getAuthHeaders = () => ({
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});

export const apis = {
  auth: {
    login: () => ({
      url: createUrl(import.meta.env.VITE_AUTH_ENDPOINT, import.meta.env.VITE_LOGIN_PATH),
      method: 'POST'
    }),
    register: () => ({
      url: createUrl(import.meta.env.VITE_AUTH_ENDPOINT, import.meta.env.VITE_REGISTER_PATH),
      method: 'POST'
    }),
    checkAuth: () => ({
      url: createUrl(import.meta.env.VITE_AUTH_ENDPOINT, import.meta.env.VITE_CHECK_AUTH_PATH),
      method: 'GET',
      ...getAuthHeaders()
    })
  },

  products: {
    getAll: () => ({
      url: createUrl(import.meta.env.VITE_PRODUCT_ENDPOINT, import.meta.env.VITE_PRODUCTS_PATH),
      method: 'GET'
    }),
    getById: (id) => ({
      url: createUrl(import.meta.env.VITE_PRODUCT_ENDPOINT, `/${id}`),
      method: 'GET'
    }),
    delete: (id) => ({
      url: createUrl(import.meta.env.VITE_PRODUCT_ENDPOINT, `/${id}`),
      method: 'DELETE',
      ...getAuthHeaders()
    }),
    search: (query) => ({
      url: createUrl(import.meta.env.VITE_PRODUCT_ENDPOINT, `${import.meta.env.VITE_PRODUCT_SEARCH}/${encodeURIComponent(query)}`),
      method: 'GET'
    }),
    getByCategory: (categoryId) => ({
      url: createUrl(import.meta.env.VITE_CATEGORY_ENDPOINT, `/${categoryId}/products`),
      method: 'GET'
    })
  },

  reviews: {
    add: () => ({
      url: createUrl(import.meta.env.VITE_REVIEW_ENDPOINT, import.meta.env.VITE_ADD_REVIEW),
      method: 'POST',
      ...getAuthHeaders()
    }),
    getByProduct: (productId) => ({
      url: createUrl(import.meta.env.VITE_REVIEW_ENDPOINT, `/product/${productId}`),
      method: 'GET'
    })
  },

  orders: {
    create: (userId) => ({
      url: createUrl(import.meta.env.VITE_ORDER_ENDPOINT, `/${userId}`),
      method: 'POST',
      ...getAuthHeaders()
    }),
    addProducts: () => ({
      url: createUrl(import.meta.env.VITE_ORDER_ENDPOINT, import.meta.env.VITE_ORDER_PRODUCTS),
      method: 'POST',
      ...getAuthHeaders()
    })
  },

  categories: {
    getAll: () => ({
      url: createUrl(import.meta.env.VITE_CATEGORY_ENDPOINT, import.meta.env.VITE_CATEGORIES_PATH),
      method: 'GET'
    })
  },

  payment: {
    createIntent: () => ({
      url: createUrl(import.meta.env.VITE_PAYMENT_ENDPOINT, import.meta.env.VITE_PAYMENT_INTENT),
      method: 'POST',
      ...getAuthHeaders()
    })
  },

  cloudinary: {
    upload: () => ({
      url: `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
      uploadPreset: import.meta.env.VITE_CLOUDINARY_PRESET
    })
  },

  user: {
    update: () => ({
      url: createUrl(import.meta.env.VITE_USER_ENDPOINT, import.meta.env.VITE_USER_UPDATE),
      method: 'PUT',
      ...getAuthHeaders()
    }),
    getCurrent: () => ({
      url: createUrl(import.meta.env.VITE_USER_ENDPOINT, import.meta.env.VITE_USER_CURRENT),
      method: 'GET',
      ...getAuthHeaders()
    })
  },

  cart: {
    addItem: () => ({
      url: createUrl(import.meta.env.VITE_CART_ENDPOINT, import.meta.env.VITE_CART_ADD),
      method: 'POST',
      ...getAuthHeaders()
    }),
    getItems: () => ({
      url: createUrl(import.meta.env.VITE_CART_ENDPOINT, import.meta.env.VITE_CART_ITEMS),
      method: 'GET',
      ...getAuthHeaders()
    })
  }
};

export const makeRequest = async (apiConfig, data = null) => {
  try {
    const config = apiConfig();
    const options = {
      method: config.method,
      headers: config.headers,
      ...(data && { data })
    };
    
    const response = await axios(config.url, options);
    return response;
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

export default apis;
