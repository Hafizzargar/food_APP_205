import axios from "axios";
import { useEffect, useState } from "react";
import "./products.css";
import toast from "react-hot-toast";

function Products() {
  const [prod, setprod] = useState([]);

  const removeprod=async({_id})=>{
    console.log(_id);
    
    try{
      const res=await axios.post('http://localhost:4000/api/data/removeproduct',{_id},{
        withCredentials:true
      })
      console.log(res);
      if(res.data.message==="Product has removed"){
        toast.success(res.data.message);
        setprod(prod.filter((e)=>e._id!==_id));
        return 
      }else{
        toast.error(res.data.message);
        return 
      }
      

    }
    catch(err){
      console.log(err);

      
    }

  }

  useEffect(() => {
    const getproducts = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/data/getproducts', {
          withCredentials: true
        });
        console.log(res.data.dataproducts);
        setprod(res.data.dataproducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    getproducts();
  }, []);


 

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };
  

  return (
    <div className="product-container">
      {
        prod.map((e) => (
          <div key={e._id} className="product-card">
            <img
              src={`data:image/png;base64,${arrayBufferToBase64(e.image.data.data)}`}
              alt={e.prodname}
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-name">{e.prodname}</h3>
              <p className="product-price">Price: ${e.price}</p>
              <p className="product-category">Category: {e.category}</p>
              <p className="product-rating">Rating: {e.rating}</p>
              <p className="product-description">{e.desp}</p>
            </div>
            <button className="rem" onClick={()=>removeprod({_id:e._id})}>❌</button>
          </div>
        ))
      }
    </div>
  );
}

export default Products;
