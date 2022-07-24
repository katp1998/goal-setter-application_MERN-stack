import React from 'react'
import {useState, useEffect} from 'react'
import { FaUser } from 'react-icons/fa';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const {name, email, password, confirmPassword} = formData

  const onChange = () =>{

  }

  return (
    <>
    <section className='heading'>
        <h1>
            <FaUser /> Register
            <p>Create an account!</p>
        </h1>
    </section>
    <section className="form">
        <form>
            <div className="form-group">
                <input type="text" className='form-control' id = "name" name = "name" value={name} placeholder="Enter your name" onChange={onChange}/>
            </div>
            <div className="form-group">
                <input type="text" className='form-control' id = "email" name = "email" value={email} placeholder="Enter your email address" onChange={onChange}/>
            </div>
            <div className="form-group">
                <input type="text" className='form-control' id = "password" name = "password" value={password} placeholder="Enter your password" onChange={onChange}/>
            </div>
            <div className="form-group">
                <input type="text" className='form-control' id = "confirmPassword" name = "confirmPassword" value={confirmPassword} placeholder="Confirm password" onChange={onChange}/>
            </div>
        </form>
    </section>
    
    </>
  )
}

export default Register