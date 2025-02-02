const apisCategory = {
    getAll:`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GETALL}`,
    getProductByCategory:`${import.meta.env.VITE_BASE_URL}/category/`,
    handelDelete:  `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_Delete}`
  };
  
  const apisUser = {
    fetchUsers:`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_USER}`,
    fetchUserById:`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_ONEUSER}`,
  };

  const Authentication = {
    login:`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_LOGIN}`,
  };

  const productsApi = {
    getAllProducts:`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_PRODUCT}`,
    productById:`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_PRODUCTBYID}`,
  }
  
  export default { apisCategory, apisUser,Authentication,productsApi };    