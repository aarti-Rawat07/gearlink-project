import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { categories } from '../../data/dummyAdminData';

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: ''
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const res = await axios.get(`/api/products/${id}`);
          const productToEdit = res.data;
          setFormData({
            name: productToEdit.name || '',
            brand: productToEdit.brand || '',
            category: productToEdit.category || '',
            price: productToEdit.price || '',
            stock: productToEdit.stock || '',
            description: productToEdit.description || '',
            image: productToEdit.image || '',
          });
          setImagePreview(productToEdit.image);
        } catch (err) {
          console.error('Failed to load product for editing', err);
          alert('Unable to load product details. Please try again.');
        }
      };
      fetchProduct();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, image: url }));
    if (url) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login as admin before adding a product.');
      return;
    }

    const newProduct = {
      name: formData.name,
      brand: formData.brand,
      category: formData.category,
      price: Number(formData.price),
      stock: String(formData.stock),
      description: formData.description,
      image: formData.image,
    };

    try {
      if (isEditMode) {
        await axios.put(`/api/products/${id}`, newProduct, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Product successfully updated!');
      } else {
        await axios.post('/api/products', newProduct, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Product successfully added!');
      }
      navigate('/admin-dashboard/products');
    } catch (error) {
      console.error('Failed to save product', error);
      const serverMessage = error.response?.data?.error;
      const statusText = error.response?.statusText;
      const message = serverMessage || statusText || 'Unable to save product. Please try again.';
      alert(message);
      if (serverMessage === 'Invalid token' || serverMessage === 'Access denied' || error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        navigate('/login');
      }
    }
  };

  return (
    <div className="container-fluid max-w-4xl mx-auto">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
        <button className="btn btn-outline-secondary" onClick={() => navigate('/admin-dashboard/products')}>
          <i className="bi bi-arrow-left me-2"></i> Back to Products
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Product Name</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. High Performance Brake Pads" />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Brand</label>
                <input type="text" className="form-control" name="brand" value={formData.brand} onChange={handleChange} required placeholder="e.g. Brembo" />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Category</label>
                <select className="form-select" name="category" value={formData.category} onChange={handleChange} required>
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="col-md-3">
                <label className="form-label fw-semibold">Price ($)</label>
                <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" />
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">Stock Quantity</label>
                <input type="number" className="form-control" name="stock" value={formData.stock} onChange={handleChange} required min="0" />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Description</label>
                <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Product details..."></textarea>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Product Image URL (Optional)</label>
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-image"></i></span>
                  <input
                    type="url"
                    className="form-control"
                    name="image"
                    value={formData.image}
                    onChange={handleImageUrlChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <small className="text-muted d-block mt-2">Paste a direct image URL. Leave empty for no image.</small>
                {imagePreview && (
                  <div className="mt-3">
                    <label className="form-label">Preview</label>
                    <div className="border rounded p-2" style={{ display: 'inline-block' }}>
                      <img src={imagePreview} alt="Preview" className="img-thumbnail" style={{ height: '150px', objectFit: 'cover' }} onError={() => setImagePreview(null)} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <hr className="my-4" />
            
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-light me-2" onClick={() => navigate('/admin-dashboard/products')}>Cancel</button>
              <button type="submit" className="btn btn-primary px-4">
                {isEditMode ? 'Update Product' : 'Save Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductForm;
