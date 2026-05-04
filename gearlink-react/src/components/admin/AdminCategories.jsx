import React, { useState } from 'react';
import { categories as initialCategories } from '../../data/dummyAdminData';

const AdminCategories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
      setCategories([...categories, { id: newId, name: newCategory.trim(), count: 0 }]);
      setNewCategory('');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  return (
    <div className="container-fluid max-w-4xl mx-auto">
      <h2 className="fw-bold mb-4">Manage Categories</h2>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h5 className="card-title fw-bold mb-3">Add Category</h5>
              <form onSubmit={handleAddCategory}>
                <div className="mb-3">
                  <label className="form-label">Category Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)} 
                    placeholder="e.g. Tires & Wheels" 
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Category</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-0">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">Category Name</th>
                    <th>Product Count</th>
                    <th className="text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td className="ps-4 fw-semibold">{category.name}</td>
                      <td>
                        <span className="badge bg-secondary rounded-pill px-3 py-2">{category.count} items</span>
                      </td>
                      <td className="text-end pe-4">
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(category.id)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {categories.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center py-4 text-muted">No categories found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
