// import { useContext, useState } from 'react';
// import './Create.css';
// import Header from '../Header/Header';
// import { FirebaseContext, AuthContext } from '../../store/Context';
// import { addDoc, collection, getFirestore } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// const date = new Date()


// const Create = () => {
//   const { user } = useContext(AuthContext);
//   const [name, setName] = useState('');
//   const [category, setCategory] = useState('');
//   const [price, setPrice] = useState('');
//   const [img, setImg] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate()

//   const validateInputs = () => {
//     if (!name || !category || !price || !img) {
//       setError('All fields are required.');
//       return false;
//     }
//     setError('');
//     return true;
//   };

//   const handlesubmit = async () => {
//     if (!validateInputs()) return;
//     setIsLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append('file', img);
//       formData.append('upload_preset', 'images');
//       formData.append('cloud_name', 'djidbjp55');

//       const res = await axios.post('https://api.cloudinary.com/v1_1/djidbjp55/image/upload', formData);
//       const imageUrl = res.data.secure_url;
//       console.log(imageUrl);
//       console.log(user.uid);
//       const db = getFirestore()
//       addDoc(collection(db, 'products'), {
//         product: name,
//         category,
//         price,
//         url: imageUrl,
//         userId: user.uid,
//         createAt: date.toDateString(),
//       })
//       setSuccessMessage('Product uploaded successfully!');
//       setTimeout(() => {
//         navigate('/');
//       }, 2000);

//     } catch (error) {
//       console.error('Error uploading image or saving product:', error);
//       setError('Failed to upload the product. Please try again.');
//     }
//     finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="centerDiv">
//         <h2>Sell Your Item</h2>
//         {error && <p className="error">{error}</p>}
//         {successMessage && <p className="success">{successMessage}</p>}
//         <form>
//           <label htmlFor="name">Name</label>
//           <input
//             className="input"
//             type="text"
//             id="name"
//             name="Name"
//             onChange={(e) => setName(e.target.value)}
//             value={name}
//             placeholder="Enter item name"
//           />
//           <label htmlFor="category">Category</label>
//           <input
//             className="input"
//             type="text"
//             id="category"
//             name="Category"
//             onChange={(e) => setCategory(e.target.value)}
//             value={category}
//             placeholder="Enter item category"
//           />
//           <label htmlFor="price">Price</label>
//           <input
//             className="input"
//             type="number"
//             id="price"
//             name="Price"
//             onChange={(e) => setPrice(e.target.value)}
//             value={price}
//             placeholder="Enter price"
//           />
//         </form>
//         {img && <img alt="Preview" width="200px" height="200px" src={URL.createObjectURL(img)} />}
//         <form>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               const file = e.target.files[0];
//               if (file) setImg(file);
//               else alert('Invalid file type');
//             }}
//           />
//           <button className="uploadBtn" type="button" onClick={handlesubmit} disabled={isLoading}>
//             {isLoading ? 'Uploading...' : 'Upload and Submit'}
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Create;


// // v7OgyOJK92yqp8URu4VQlD7gIo8

// // 381441586941789