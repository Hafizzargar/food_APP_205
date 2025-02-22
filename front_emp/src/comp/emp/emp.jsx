import { useNavigate } from 'react-router-dom';
import Products from '../products/products';
import './emp.css';

function Emp() {
  const navigate = useNavigate();

  return (
    <div className="emp-container">
      <div className="emp-logo" onClick={() => window.location.href = 'http://localhost:5173'}>
        <img src='../../../public/Foodgo.png' alt='Home' />
      </div>

      <div className="emp-button-container">
        <button onClick={() => navigate('/addproduct')}>Add Product to Cart</button>
      </div>

      <Products />
    </div>
  );
}

export default Emp;

