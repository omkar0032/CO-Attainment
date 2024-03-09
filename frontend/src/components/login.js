import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Validation from './loginValidation';
import axios from 'axios';
import backgroundImage from './pict2.jpg'; // Import your background image

function LoginNikunj() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // useNavigate hook

  const [errors, setErrors] = useState({});
  const [email,setEmail]=useState('');
  const [password ,setPassword]=useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          if (res.data === "Success") {
            navigate('/home'); // Use navigate to navigate
          } else {
            alert("No record existed");
          }
        })
        .catch(err => console.log(err));
    }
  };
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover'  }}>
      <div className='d-flex justify-content-center align-items-center  vh-100'>
        <div className='bg-white p-3 rounded w-25'>
          <h2 style={{ fontFamily: 'Arial', color: '#333' }}>Sign In</h2>
          <form action=" " onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="enter email" name='email' onChange={e=>{setEmail(e.target.value)}} className="form-control rounded-0"></input>
              {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="enter password" name="password" onChange={e=>{setPassword(e.target.value)}} className="form-control rounded-0"></input>
              {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <button type='submit' className='btn btn-success w-100'>Login</button>
            <p>u agree to our policy</p>
            <Link to='/signup' style={{ color: '#333' }} className='btn btn-default border w-100 color-'>create account</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginNikunj;
