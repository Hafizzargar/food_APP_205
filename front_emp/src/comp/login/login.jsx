import  { useEffect, useState } from 'react';
import './Login.css';
import axios from 'axios'
import {  useNavigate } from 'react-router-dom';

function Login() {
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const navigate=useNavigate();
  useEffect(() => {
    document.title = "Employee Work"; // Set the page title
  }, []);
  const loginfxn=async(e)=>{
    e.preventDefault();
    console.log("check");
    try{
        const res=await axios.post('http://localhost:4000/api/auth/login',{email,password},{
            withCredentials:true
        })
        console.log(res);
        
        
        if(res.data.message==="login done by employee successfully done"){
            window.localStorage.setItem('emp_token',res.data.Token)
          
            navigate('/Employee_work')

            
        }else{
            console.log('it is user');
            window.location.href='http://localhost:5173'
            
        }
        
    }
    catch(err){
        console.log(err);
        
    }

  }

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Employee Login</h2>
        <input type="text" placeholder="Email" className="login-input" onChange={(e)=>setemail(e.target.value)} />
        <input type="password" placeholder="Password" className="login-input" onChange={(e)=>setpassword(e.target.value)} />
        <button type="submit" className="login-button" onClick={(e)=>loginfxn(e)}>Login</button>
      </form>
    </div>
  );
}

export default Login;

