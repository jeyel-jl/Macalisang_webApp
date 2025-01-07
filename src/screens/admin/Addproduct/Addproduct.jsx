import React, { useState } from "react";
import Adminsidebar from "../Components/AdminSidebar/Adminsidebar";
import "./Addproduct.css";
import { useAddproduct } from "../../../hooks/useAddproduct";

const Addproduct = () => {
  const [imageUrls, setImageUrls] = useState("");
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Dogs");
  const [company, setCompany] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const { addProduct } = useAddproduct();

  const handleEnlistProduct = async (e) => {
    e.preventDefault();

    if (newImageUrl.trim() !== "") {
      setImageUrls((prev) => [...prev, newImageUrl]);
    }

    const updatedImageUrls = [...imageUrls, newImageUrl.trim()];
    await addProduct(name, detail, category, price, company, updatedImageUrls);

    console.log({
      name,
      detail,
      company,
      category,
      price,
      imageUrls: updatedImageUrls,
    });

    setName("");
    setDetail("");
    setPrice("");
    setCategory("");
    setCompany("");
    setNewImageUrl("");
    setImageUrls("");
  };


  return (
    <>
      <div className="add-main">
        <Adminsidebar />
        <div className="add-form-data">
          <h1 className="add-heading">Add Product 🔔</h1>
          <p className="heading-p">
            “What really decides consumers to buy or not to buy is the content
            of your advertising, not its form.”
          </p>
          <div className="border"></div>
          <form onSubmit={handleEnlistProduct}>
            <div className="product-form">
              <div className="textfeild">
                <h5>Product Name 🛒</h5>
                <input
                  type="text"
                  className="addproducttext"
                  placeholder="Birch Dog Food"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="textfeild">
                <h5>Product Detail 📢</h5>
                <input
                  type="text"
                  className="addproducttext"
                  placeholder="Imported Dog Food from Thailand"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                />
              </div>
              <div className="textfeild">
                <h5>Product Price 💸</h5>
                <input
                  type="text"
                  className="addproducttext"
                  placeholder="59.99"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="textfeild">
                <h5>Product Company 🏛️</h5>
                <input
                  type="text"
                  className="addproducttext"
                  placeholder="FurEver"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="textfeild">
                <h5>Product category 🌩️</h5>
                <div className="admin-dropdown">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Dogs">Dogs 🐕</option>
                    <option value="Cats">Cats 🐈</option>
                    <option value="Other">Other ❔</option>
                  </select>
                </div>
                <br />
              </div>
              <div className="textfeild">
                <h5>Add Product Image URLs</h5>
                <input
                  type="text"
                  className="addproducttext"
                  placeholder="Enter image URL"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                />
              </div>
              <div className="textfeild">
                <input
                  className="submitbutton"
                  type="submit"
                  value="Enlist Now 🗾"
                />
              </div>
            </div>
          </form>

          <div className="image-part">
            {imageUrls.length > 0 ? (
              imageUrls.map((url, index) => (
                <img
                  src={url}
                  alt="product"
                  key={index}
                  className="pro-image"
                />
              ))
            ) : (
              <p>No images added yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Addproduct;