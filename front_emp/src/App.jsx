
import './App.css'

import { Route, Routes} from "react-router-dom"

import Login from "./comp/login/login"
import Emp from "./comp/emp/emp"
import Addproduct from './comp/addproduct/addproduct'


function App() {
  
  
  return (
    <>
  
    <Routes>
      <Route path='/Employee_work' element={<Emp/>}/>
      <Route path='/' element={<Login/>}/>
      <Route path='/addproduct' element={<Addproduct/>}/>
    </Routes>


    
    </>
  )
}

export default App
