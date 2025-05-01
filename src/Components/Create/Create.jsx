import { useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!name || !category || !price || !img) {
      setError('All fields are required.');
      return false;
    }
    if (price <= 0) {
      setError('Price must be greater than 0.');
      return false;
    }
    setError('');
    return true;
  };

  const handlesubmit = async () => {
    const date = new Date();
    if (!validateInputs()) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', img);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);  // Access upload preset
      formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME); // Access cloud name

      const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
      const imageUrl = res.data.secure_url;
      
      const db = getFirestore();
      await addDoc(collection(db, 'products'), {
        product: name,
        category,
        price,
        url: imageUrl,
        userId: user.uid,
        createAt: date.toDateString(),
      });
      
      setSuccessMessage('Product uploaded successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Error:', error);
      setError(error?.response?.data?.message || 'Failed to upload the product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert('File is too large. Please upload a file smaller than 5MB.');
    } else if (file) {
      setImg(file);
    } else {
      alert('Invalid file type');
    }
  };

  return (
    <>
      <Header />
      <div className="centerDiv">
        <h2>Sell Your Item</h2>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <form>
          <label htmlFor="name">Name</label>
          <input
            className="input"
            type="text"
            id="name"
            name="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter item name"
            disabled={isLoading}
          />
          <label htmlFor="category">Category</label>
          <input
            className="input"
            type="text"
            id="category"
            name="Category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            placeholder="Enter item category"
            disabled={isLoading}
          />
          <label htmlFor="price">Price</label>
          <input
            className="input"
            type="number"
            id="price"
            name="Price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            placeholder="Enter price"
            disabled={isLoading}
          />
        </form>
        {img && <img alt="Preview" width="200px" height="200px" src={URL.createObjectURL(img)} />}
        <form>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isLoading}
          />
          <button className="uploadBtn" type="button" onClick={handlesubmit} disabled={isLoading}>
            {isLoading ? 'Uploading...' : 'Upload and Submit'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
