import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaUserCircle } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import logo from './BN (1).png';


const BlogPlatform = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '', image: null });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editPostId, setEditPostId] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: '', content: '' });

  const navigate = useNavigate();

  

  const user = JSON.parse(localStorage.getItem('user'));
  const USER_ID = user?.id;
  const USER_NAME = user?.username;


  const modalRef = useRef(null);

  useEffect(() => {
    fetchBlogs();
    const modalElement = modalRef.current;
    if (modalElement) {
      const modalInstance = new window.bootstrap.Modal(modalElement);
      modalRef.current.modalInstance = modalInstance;
    }
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/blogs');
      setPosts(res.data.reverse());
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditClick = (post) => {
    setIsEditing(true);
    setEditId(post.id);
    setFormData({ title: post.title, content: post.content });

    const modalInstance = modalRef.current?.modalInstance;
    if (modalInstance) {
      modalInstance.show();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      try {
        const res = await axios.put(`http://localhost:8080/api/blogs/${editId}`, {
          title: formData.title,
          content: formData.content
        }, {
          headers: { 'X-USER-ID': USER_ID }
        });

        setPosts(prev => prev.map(p => p.id === editId ? res.data : p));
      } catch (err) {
        console.error('Error updating blog:', err);
      }
    } else {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      if (formData.image) data.append('image', formData.image);

      try {
        const res = await axios.post('http://localhost:8080/api/blogs', data, {
          headers: {
            'X-USER-ID': USER_ID,
            'X-USER-NAME': USER_NAME,
            'Content-Type': 'multipart/form-data'
          }
        });

        setPosts(prev => [res.data, ...prev]);
      } catch (err) {
        console.error('Error creating blog:', err);
      }
    }

    setFormData({ title: '', content: '', image: null });
    setIsEditing(false);
    setEditId(null);
    document.getElementById('closeModalBtn').click();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/blogs/${id}`, {
        headers: { 'X-USER-ID': USER_ID }
      });
      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const likeBlog = async (id) => {
    try {
      await axios.post(`http://localhost:8080/api/blogs/${id}/like`, null, {
        headers: { 'X-USER-ID': USER_ID }
      });
      fetchBlogs();
    } catch (err) {
      console.error('Error liking blog:', err);
    }
  };

  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      <nav className="navbar navbar-dark bg-dark shadow-sm px-4 py-3 position-relative d-flex align-items-center justify-content-between">
  {/* Left Logo & Title */}
  <div className="d-flex align-items-center">
    <img 
      src={logo} 
      alt="BlogNat Logo" 
      style={{ width: '40px', height: '40px', marginRight: '10px' }} 
    />
    <span className="text-white fw-bold fs-4">BlogNat</span>
  </div>

  {/* Right Dropdown */}
  <div className="dropdown">
    <button
      className="btn d-flex align-items-center gap-2 text-white dropdown-toggle"
      type="button"
      id="userDropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      style={{ background: 'transparent', border: 'none' }}
    >
      <FaUserCircle size={22} />
      <span className="fw-normal">{USER_NAME}</span>
    </button>
    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
      <li>
        <button
          className="dropdown-item text-danger"
          onClick={() => {
            localStorage.removeItem('user');
            navigate('/');
          }}
        >
          Logout
        </button>
      </li>
    </ul>
  </div>
</nav>



      <div className="container py-5">
        <div className="row g-4">
          {posts.map((post) => (
            <div className="col-md-6 mb-4" key={post.id}>
              <div className="border border-1 rounded shadow-sm bg-white overflow-hidden h-100 d-flex flex-column" style={{ borderColor: '#e5e7eb' }}>
                
                {/* Header */}
                <div className="px-4 pt-4 d-flex justify-content-between align-items-start">
                  <div>
                    <div className="d-flex align-items-center gap-2">
                      <FaUserCircle size={20} className="text-muted" />
                      <h6 className="text-muted mb-0" style={{ fontWeight: '500' }}>{post.authorName}</h6>
                    </div>
                    <small className="text-muted mt-1 d-block" title={moment(post.createdAt).format('LLLL')}>
                      {moment(post.createdAt).fromNow()}
                    </small>
                  </div>
                  
                  {post.authorId === USER_ID && (
                    <div className="dropdown">
                      <button
                        className="btn btn-link text-muted p-0 border-0"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <BsThreeDotsVertical size={18} />
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                        <li><button className="dropdown-item" onClick={() => handleEditClick(post)}>Edit</button></li>
                        <li><button className="dropdown-item text-danger" onClick={() => handleDelete(post.id)}>Delete</button></li>
                      </ul>
                    </div>
                  )}
                </div>

                <hr className="mx-4 my-2" style={{ borderColor: '#e5e7eb' }} />

                {post.imageUrl && (
                  <div className="w-100">
                    <img src={post.imageUrl} alt="blog" className="w-100" style={{ maxHeight: '250px', objectFit: 'cover' }} />
                  </div>
                )}

                <div style={{ height: '1px', backgroundColor: '#e5e7eb', margin: '0 1.5rem' }}></div>

                <div className="px-4 pt-3">
  <h5
    className="fw-bold text-dark"
    style={{
      fontFamily: 'inherit',
      fontSize: '1.25rem',
      fontWeight: '600',
      textDecoration: ''
    }}
  >
    {post.title}
  </h5>
</div>

<div className="p-4 flex-grow-1 pt-3">
  <p
    className="text-dark mb-0"
    style={{
      fontFamily: 'sans-serif',
      fontSize: '1rem',
      fontWeight: '300',
      fontStyle: 'italic',
      textIndent: '2em'  // This creates a tab-like indent
    }}
  >
    {post.content}
  </p>
</div>



                <div className="px-4 pb-3 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <button className="btn btn-sm btn-outline-dark me-3 d-flex align-items-center gap-1"
                      onClick={() => likeBlog(post.id)}
                      style={{ borderRadius: '6px', fontWeight: '500' }}>
                      <FcLike size={18} />
                    
                    </button>
                    <small className="text-muted">{post.likedBy?.length} Likes</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="btn btn-dark rounded-circle position-fixed bottom-0 end-0 m-4"
        data-bs-toggle="modal"
        data-bs-target="#createModal"
        style={{
          width: '50px',
          height: '50px',
          fontSize: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          padding: 0
        }}>
        +
      </button>

      {/* Modal */}
      <div className="modal fade" id="createModal" tabIndex="-1" aria-labelledby="createModalLabel" aria-hidden="true" ref={modalRef}>
        <div className="modal-dialog">
          <form onSubmit={handleSubmit} className="modal-content" style={{ borderRadius: '8px' }}>
            <div className="modal-header" style={{ borderBottom: '1px solid #f3f4f6', padding: '16px 24px' }}>
              <h5 className="modal-title fw-bold" id="createModalLabel">{isEditing ? 'Edit Blog' : 'Create New Blog'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalBtn"></button>
            </div>
            <div className="modal-body" style={{ padding: '24px' }}>
              <div className="mb-3">
                <label className="form-label text-secondary fw-medium small mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: '6px', padding: '10px 14px', borderColor: '#e5e7eb' }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-secondary fw-medium small mb-2">Content</label>
                <textarea
                  name="content"
                  placeholder="Write something..."
                  className="form-control"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: '6px', padding: '10px 14px', borderColor: '#e5e7eb', minHeight: '120px' }}
                />
              </div>
              {!isEditing && (
                <div className="mb-3">
                  <label className="form-label text-secondary fw-medium small mb-2">Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="form-control"
                    onChange={handleChange}
                    style={{ borderRadius: '6px', padding: '10px 14px', borderColor: '#e5e7eb' }}
                  />
                </div>
              )}
            </div>
            <div className="modal-footer" style={{ borderTop: '1px solid #f3f4f6', padding: '16px 24px', gap: '12px' }}>
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
                style={{ borderRadius: '6px', fontWeight: '500', paddingLeft: '16px', paddingRight: '16px' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-dark"
                style={{ borderRadius: '6px', fontWeight: '500', paddingLeft: '16px', paddingRight: '16px' }}
              >
                {isEditing ? 'Update' : 'Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogPlatform;
