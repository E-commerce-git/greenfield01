require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        EMAIL_USER:process.env.EMAIL_USER,
        EMAIL_PASS:process.env.EMAIL_PASS,
        PORT:process.env.PORT,
        Host:process.env.Host,
        
        ORDERSROUTER: process.env.ORDERSROUTER,
        ORDERPRODUCTROUTER: process.env.ORDERPRODUCTROUTER,
        USERROUTES: process.env.USERROUTES,
        PRODUCTROUTES: process.env.PRODUCTROUTES,
        CATEGORYROUTES: process.env.CATEGORYROUTES,
        PAYMENTROUTES: process.env.PAYMENTROUTES,
        CONTACTROUTES: process.env.CONTACTROUTES,
        REVIEWROUTES: process.env.REVIEWROUTES,


        CATEGORY:process.env.CATEGORY,
        GET_CATEGORY_BY_ID: process.env.GET_CATEGORY_BY_ID,
        ADD_CATEGORY: process.env.ADD_CATEGORY,
        UPDATE_CATEGORY:process.env.UPDATE_CATEGORY,
        DELETE_CATEGORY:process.env.DELETE_CATEGORY,
        GET_PRODUCTS_BY_CATEGORY:process.env.GET_PRODUCTS_BY_CATEGORY,

        SEND:process.env.SEND,

        ADD_TO_CART:process.env.ADD_TO_CART,
        REMOVE_FROM_CART:process.env.REMOVE_FROM_CART,
        INSERT_INTO_ORDER_PRODUCT:process.env.INSERT_INTO_ORDER_PRODUCT,
        UPDATE_CART:process.env.UPDATE_CART,
        GET_ALL_PRODUCT_ORDERS:process.env.GET_ALL_PRODUCT_ORDERS,

        CREATE_ORDER_ENDPOINT:process.env.CREATE_ORDER_ENDPOINT,
        GET_ALL_ORDERS_ENDPOINT:process.env.GET_ALL_ORDERS_ENDPOINT,
        UPDATE_ORDER_STATUS_ENDPOINT:process.env.UPDATE_ORDER_STATUS_ENDPOINT,
        GET_ORDER_DETAILS_ENDPOINT:process.env.GET_ORDER_DETAILS_ENDPOINT,

        CREATEPAYMENTINTENT:process.env.CREATEPAYMENTINTENT,

        ADD_PRODUCT:process.env.ADD_PRODUCT,
        GET_ALL_PRODUCTS:process.env.GET_ALL_PRODUCTS,
        DELETE_PRODUCT:process.env.DELETE_PRODUCT,
        UPDATE_PRODUCT:process.env.UPDATE_PRODUCT,
        SEARCH_PRODUCT_BY_NAME:process.env.SEARCH_PRODUCT_BY_NAME,

        ADD_REVIEW:process.env.ADD_REVIEW,
        GET_PRODUCT_REVIEWS:process.env.GET_PRODUCT_REVIEWS,

        UPDATE_USER_ENDPOINT:process.env.UPDATE_USER_ENDPOINT,
        DELETE_USER_ENDPOINT:process.env.DELETE_USER_ENDPOINT,
        GET_ALL_USERS_ENDPOINT:process.env.GET_ALL_USERS_ENDPOINT,
        CURRENT_USER_ENDPOINT:process.env.CURRENT_USER_ENDPOINT,
        REGISTER_ENDPOINT:process.env.REGISTER_ENDPOINT,
        LOGIN_ENDPOINT:process.env.LOGIN_ENDPOINT,
        GET_USER_BY_ID_ENDPOINT:process.env.GET_USER_BY_ID_ENDPOINT,
        CHECK_AUTH_ENDPOINT:process.env.CHECK_AUTH_ENDPOINT,
        REGISTER_ADMIN_ENDPOINT:process.env.REGISTER_ADMIN_ENDPOINT,
        LOGIN_ADMIN_ENDPOINT:process.env.LOGIN_ADMIN_ENDPOINT,
        UPDATE_USER_FROM_ADMIN_ENDPOINT:process.env.UPDATE_USER_FROM_ADMIN_ENDPOINT,
    }
};
