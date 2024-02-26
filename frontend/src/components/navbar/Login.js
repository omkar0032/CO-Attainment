import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    // e.preventDefault();

    // Check if the password meets the minimum length requirement
    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }
    // Reset the form fields after submission (if needed)
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <div className="container d-flex justify-content-center  vh-100" style={{marginTop:'50px'}}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label" >
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div className="text-center my-4"  >
        <button type="button" class="btn btn-secondary" style={{width:'150px'}}>Login By Google</button>

        </div>

        <div className="text-center my-3">
        <button type="submit" className="btn btn-primary "style={{width:'150px'}} >
          Submit
        </button>
        </div>
      </form>
      </div>
    </>
  );
}
