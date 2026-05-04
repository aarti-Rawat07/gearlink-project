import React, { useEffect, useState } from 'react';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const getInquiryId = (inquiry) => inquiry._id || inquiry.id;

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();
      if (response.ok) {
        setInquiries(data);
      } else {
        console.error('Unable to fetch inquiries:', data.error);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const updated = await response.json();
      if (response.ok) {
        setInquiries(inquiries.map(inq => getInquiryId(inq) === id ? updated : inq));
        setStatusMessage('Inquiry status updated.');
      } else {
        setStatusMessage(updated.error || 'Unable to update status.');
      }
    } catch (error) {
      console.error(error);
      setStatusMessage('Unable to update status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const response = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      const result = await response.json();
      if (response.ok) {
        setInquiries(inquiries.filter(inq => getInquiryId(inq) !== id));
        setStatusMessage(result.message || 'Inquiry deleted successfully.');
      } else {
        setStatusMessage(result.error || 'Unable to delete inquiry.');
      }
    } catch (error) {
      console.error(error);
      setStatusMessage('Unable to delete inquiry.');
    }
  };

  const handleReplySubmit = async (id) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Replied', reply: replyText }),
      });
      const updated = await response.json();
      if (response.ok) {
        setInquiries(inquiries.map(inq => getInquiryId(inq) === id ? updated : inq));
        setActiveReplyId(null);
        setReplyText('');
        setStatusMessage('Reply saved successfully.');
      } else {
        setStatusMessage(updated.error || 'Unable to save reply.');
      }
    } catch (error) {
      console.error(error);
      setStatusMessage('Unable to save reply.');
    }
  };

  return (
    <div>
      <h2 className="fw-bold mb-4">Customer Inquiries</h2>

      {statusMessage && (
        <div className="alert alert-info">{statusMessage}</div>
      )}

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Date</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Reply</th>
                  <th>Status</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry) => {
                  const id = getInquiryId(inquiry);
                  return (
                    <React.Fragment key={id}>
                      <tr>
                        <td className="ps-4 text-muted">{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                        <td className="fw-semibold">{inquiry.name || 'Guest'}</td>
                        <td>{inquiry.mobile || inquiry.email}</td>
                        <td style={{ maxWidth: '250px' }} className="text-truncate" title={inquiry.message}>
                          {inquiry.message}
                        </td>
                        <td style={{ maxWidth: '250px' }} className="text-truncate" title={inquiry.reply || ''}>
                          {inquiry.reply || '-'}
                        </td>
                        <td>
                          <span className={`badge rounded-pill px-3 py-2 ${inquiry.status === 'Pending' ? 'bg-warning text-dark' : 'bg-success'}`}>
                            {inquiry.status}
                          </span>
                        </td>
                        <td className="text-end pe-4">
                          {inquiry.status === 'Pending' && (
                            <button
                              className="btn btn-sm btn-outline-success me-2"
                              onClick={() => setActiveReplyId(id)}
                              title="Reply"
                            >
                              <i className="bi bi-reply"></i>
                            </button>
                          )}
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(id)}
                            title="Delete"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                      {activeReplyId === id && (
                        <tr>
                          <td colSpan="7" className="bg-light">
                            <div className="d-flex flex-column gap-2 p-3">
                              <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="form-control"
                                placeholder="Write your reply here..."
                                rows={3}
                              />
                              <div className="d-flex justify-content-end gap-2">
                                <button className="btn btn-sm btn-secondary" onClick={() => { setActiveReplyId(null); setReplyText(''); }}>
                                  Cancel
                                </button>
                                <button className="btn btn-sm btn-primary" onClick={() => handleReplySubmit(id)}>
                                  Save Reply
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
                {inquiries.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">No inquiries found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInquiries;
