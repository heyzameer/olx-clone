import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContaxt';
import { FirebaseContext } from '../../store/Context';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

function View() {
  const [userdetails, setUserdetails] = useState(null);
  const { postdetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);
  const userId = postdetails?.userId;

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const db = getFirestore(firebase);
          const q = query(collection(db, 'users'), where('id', '==', userId));
          const querySnapshot = await getDocs(q);

          const data = querySnapshot.docs.map((doc) => doc.data());
          if (data.length > 0) {
            setUserdetails(data[0]);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
      fetchData();
    }
  }, [userId, firebase]);

  if (!postdetails) {
    return <div>Loading post details...</div>;
  }

  if (!userdetails) {
    return <div>Loading user details...</div>;
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postdetails?.url} alt={postdetails?.product} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postdetails?.price}</p>
          <span>{postdetails?.product}</span>
          <p>{postdetails?.category}</p>
          <span>{new Date(postdetails?.createAt).toLocaleDateString()}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userdetails?.username || 'No name available'}</p>
          <p>{userdetails?.phone || 'Phone not available'}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
