import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import development from '../config/default';

export default function SellerDashboard() {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const [categories, setCategories] = useState([]);
  
  // Redirect if no token
  if (!token) {
    navigate('/login');
    return null;
  }

  // Update config to include Bearer prefix
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  const [activeForm, setActiveForm] = useState('add');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    stock: 0,
    imageUrl: '',
    size: 'M',
    categoryId: '',
    UserId: user?.id
  });
  const [productId, setProductId] = useState('');
  const [uploading, setUploading] = useState(false);
  
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(development.VITE_CATEGORY);
        // Access the nested categories array
        setCategories(response.data.categories);
        console.log('Categories loaded:', response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Log categories state when it changes
  useEffect(() => {
    console.log('Current categories:', categories);
  }, [categories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

        if (!CLOUD_NAME || !import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET) {
            console.error("Cloudinary configuration is missing. Check your .env file.");
            return;
        }

        const response = await axios.post(
            `${development.VITE_CLOUDINARY}${CLOUD_NAME}/image/upload`,
            formData
        );

        setFormData(prev => ({
            ...prev,
            imageUrl: response.data.secure_url
        }));
    } catch (error) {
        console.error('Error uploading image:', error.response?.data || error.message);
    } finally {
        setUploading(false);
    }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if token exists
      if (!token) {
        console.error('No authentication token found');
        navigate('/login');
        return;
      }

      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description || '',
        stock: parseInt(formData.stock),
        imageUrl: formData.imageUrl,
        size: formData.size,
        categoryId: parseInt(formData.categoryId),
        UserId: user.id
      };
      console.log('Product Data:', productData);

      // Log the headers being sent
      console.log('Request headers:', config.headers);

      let response;
      switch (activeForm) {
        case 'add':
          response = await axios.post(`${development.VITE_PRODUCT}add`, productData, config);
          console.log('Success Response:', response.data);
          break;

        case 'edit':
          response = await axios.put(`${development.VITE_PRODUCT}${productId}`, productData, config);
          console.log('Success Response:', response.data);
          break;

        case 'delete':
          response = await axios.delete(`${development.VITE_PRODUCT}${productId}`, config);
          console.log('Success Response:', response.data);
          break;
      }

      // Reset form after successful submission
      setFormData({
        name: '',
        price: '',
        description: '',
        stock: 0,
        imageUrl: '',
        size: 'M',
        categoryId: '',
        UserId: user.id
      });
      setProductId('');

    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.config?.headers // Log the headers that were sent
      });

      // Handle unauthorized access
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Management Options */}
        <div className="space-y-6">
          {/* Add Product Section */}
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#db4444] flex items-center justify-center flex-shrink-0">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Add Product</h2>
              <p className="text-gray-600">Add new products to your inventory</p>
              <button 
                onClick={() => setActiveForm('add')}
                className={`text-sm ${activeForm === 'add' ? 'text-[#db4444]' : 'text-gray-600'}`}
              >
                Select
              </button>
            </div>
          </div>

          {/* Edit Product Section */}
          <div className="flex items-start space-x-4 pt-6">
            <div className="w-12 h-12 rounded-full bg-[#db4444] flex items-center justify-center flex-shrink-0">
              <Edit className="w-6 h-6 text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Edit Product</h2>
              <p className="text-gray-600">Modify existing product details</p>
              <button 
                onClick={() => setActiveForm('edit')}
                className={`text-sm ${activeForm === 'edit' ? 'text-[#db4444]' : 'text-gray-600'}`}
              >
                Select
              </button>
            </div>
          </div>

          {/* Delete Product Section */}
          <div className="flex items-start space-x-4 pt-6">
            <div className="w-12 h-12 rounded-full bg-[#db4444] flex items-center justify-center flex-shrink-0">
              <Trash2 className="w-6 h-6 text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Delete Product</h2>
              <p className="text-gray-600">Remove products from your inventory</p>
              <button 
                onClick={() => setActiveForm('delete')}
                className={`text-sm ${activeForm === 'delete' ? 'text-[#db4444]' : 'text-gray-600'}`}
              >
                Select
              </button>
            </div>
          </div>
        </div>

        {/* Product Form */}
        <div className="bg-white p-6 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {activeForm === 'add' || activeForm === 'edit' ? (
              <>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Product Name *"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#db4444] focus:border-transparent"
                    required
                  />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Price *"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#db4444] focus:border-transparent"
                    required
                  />
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="Stock Quantity *"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#db4444] focus:border-transparent"
                    required
                  />
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#db4444] focus:border-transparent"
                    required
                  >
                    {sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#db4444] focus:border-transparent"
                    required
                  >
                    <option value="">Select Category *</option>
                    {categories && categories.length > 0 ? (
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>Loading categories...</option>
                    )}
                  </select>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Product Description"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#db4444] focus:border-transparent"
                  />
                  <div className="space-y-2">
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#db4444] focus:border-transparent"
                    />
                    {uploading && <p className="text-sm text-gray-500">Uploading image...</p>}
                    {formData.imageUrl && (
                      <div className="mt-2">
                        <img 
                          src={formData.imageUrl} 
                          alt="Preview" 
                          className="w-32 h-32 object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  placeholder="Product ID to Delete *"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#db4444] focus:border-transparent"
                  required
                />
                <p className="text-red-500 text-sm">
                  Warning: This action cannot be undone. Please be certain.
                </p>
              </div>
            )}
            
            <button
              type="submit"
              className="bg-[#db4444] text-white px-8 py-2.5 rounded-md hover:bg-[#db4444]/90 transition-colors"
            >
              {activeForm === 'add' ? 'Add Product' : 
               activeForm === 'edit' ? 'Update Product' : 
               'Delete Product'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
