import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { PostContext } from "../../store/PostContaxt";
import { useNavigate } from "react-router-dom";

import Heart from "../../assets/Heart";
import "./Post.css";

const ProductCard = ({ product, onClick }) => (
  <div className="card" onClick={() => onClick(product)}>
    <div className="favorite">
      <Heart />
    </div>
    <div className="image">
      <img src={product.url} alt={product.product} />
    </div>
    <div className="content">
      <p className="rate">&#x20B9; {product.price}</p>
      <span className="kilometer">{product.category}</span>
      <p className="name">{product.product}</p>
    </div>
    <div className="date">
    <span>{new Date(product.createAt).toLocaleDateString()}</span>
    </div>
  </div>
);

function Posts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setPostdetails } = useContext(PostContext);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "products"));
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Products:", products);
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCardClick = (product) => {
    console.log("Selected Product:", product);
    setPostdetails(product);
    navigate("/viewpost");
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="postParentDiv">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : products.length === 0 ? (
        <p>No products available at the moment.</p>
      ) : (
        <>
          <div className="moreView">
            <div className="heading">
              <span>Quick Menu</span>
              {/* <span>View more</span> */}
            </div>
            <div className="cards">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          </div>
          <div className="recommendations">
            <div className="heading">
              <span>Fresh recommendations</span>
            </div>
            <div className="cards-2">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Posts;
