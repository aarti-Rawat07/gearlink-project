import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch admin products', err);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login as admin to delete products.');
        return;
      }
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(products.filter(p => p._id !== id));
        alert('Product deleted successfully!');
      } catch (err) {
        console.error('Failed to delete product', err);
        const message = err.response?.data?.error || 'Failed to delete product. Please try again.';
        alert(message);
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Products</h2>
        <button className="btn btn-primary shadow-sm" onClick={() => navigate('/admin-dashboard/add-product')}>
          <i className="bi bi-plus-lg me-2"></i> Add New Product
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="ps-4">Product</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <img src={product.image} alt={product.name} className="rounded" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                        <div className="ms-3">
                          <h6 className="mb-0 fw-semibold">{product.name}</h6>
                          <small className="text-muted">{product.brand}</small>
                        </div>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>{product.stock}</td>
                    <td>
                      {Number(product.stock) === 0 ? (
                        <span className="badge bg-danger rounded-pill px-3 py-2">Out of Stock</span>
                      ) : Number(product.stock) <= 10 ? (
                        <span className="badge bg-warning text-dark rounded-pill px-3 py-2">Low Stock</span>
                      ) : (
                        <span className="badge bg-success rounded-pill px-3 py-2">In Stock</span>
                      )}
                    </td>
                    <td className="text-end pe-4">
                      <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => navigate(`/admin-dashboard/edit-product/${product._id}`)}>
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(product._id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
