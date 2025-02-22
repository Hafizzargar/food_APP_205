import { useState } from "react";
import "./addproduct.css";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

function Addproduct() {
  const [prodname, setProdname] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [rating, setrating] = useState("");
  const [desp, setdesp] = useState("");
  const [image, setImage] = useState(null);
  const Addproductfxn=async(e)=>{
    e.preventDefault();
    try{
        const res=await axios.post('http://localhost:4000/api/data/addproduct',{prodname,price,category,rating,desp,image},
            {
                headers: {
                  "Content-Type": "multipart/form-data"
                },
                withCredentials: true
              }
        )
        console.log(res);
        if(res.data.message==='New Product has been save to data'){
            toast.success('New Product has been save to data');
            setPrice('')
            setProdname('');
            setImage(null),
            setdesp('');
            setrating('');
            setCategory("");
            return
        }else{
            toast.error(res.data.message);
        }
    }
    catch(err){
        console.log(err);
        
    }

  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="addproduct-container">
    <div className="a1"><Link to='/Employee_work'>close</Link></div>
      <h2>Add New Product</h2>
      
      <label className="addproduct-label">Product Name:</label>
      <input
        className="addproduct-input"
        type="text"
        placeholder="Enter name here"
        value={prodname}
        onChange={(e) => setProdname(e.target.value)}
      />

      <label className="addproduct-label">Price:</label>
      <input
        className="addproduct-input"
        type="number"
        placeholder="Enter price here"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label className="addproduct-label">Rating:</label>
      <input
        className="addproduct-input"
        type="text"
        placeholder="Enter rating (0-5)"
        value={rating}
        maxLength={2}
        minLength={0}
        onChange={(e) => {
          if (e.target.value > 5 || e.target.value < 0) {
            setrating("");
            return toast.error("Rating value must be between 0 and 5");
          }
          setrating(e.target.value);
        }}
      />

      <label className="addproduct-label">Category:</label>
      <select
        className="addproduct-select"
        value={category}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select an option
        </option>
        <option value="toys">Toys</option>
        <option value="books">Books</option>
        <option value="clothes">Clothes</option>
        <option value="shoes">Shoes</option>
        <option value="other">Other</option>
      </select>

      <label className="addproduct-label">Product Image:</label>
      <input
        className="addproduct-input-file"
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />

      <label className="addproduct-label">Description:</label>
      <textarea
        className="addproduct-textarea"
        value={desp}
        onChange={(e) => setdesp(e.target.value)}
        placeholder="Type product description here..."
        rows="5"
        cols="50"
      />

      <button className="addproduct-button" onClick={(e)=>Addproductfxn(e)}>Add Product</button>
    </div>
  );
}

export default Addproduct;

