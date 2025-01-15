import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

function HomePage(){
    const[isSignVisible,setIsSignVisible]=useState();
  const [signUpformData, setsignUpFormData] = useState({
          email: '',
          password: '',
          role: 'student',
      });

  const[loginFormData, setLoginFormData]=useState({
    email:'',
    password:''
  });

  const navigate = useNavigate(); // Hook for navigation

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
};
      const handleSignChange = (e) => {
        const { name, value } = e.target;
        setsignUpFormData({ ...signUpformData, [name]: value });
    };


    function showSignForm(){
      setIsSignVisible(true)
    }

    async function handleSignUpSubmit(e){
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/api/creds', signUpformData);
        // const role=response.data.role;
        if(response.status===201){
            const user = { data:response.data};
            navigate('/first', { state: { user } });
        }
    } catch (error) {
        console.error(error);
        alert('Signup failed!');
    }
    }

    async function handleLoginSubmit(e) {

      e.preventDefault();
      try{
        const response=await axios.get(`http://localhost:8080/api/creds/${loginFormData.email}`)
        if (response.status === 200) {
            const user = { data:response.data};
          navigate('/first', { state: { user } });
      }
        
      }catch(err){
        console.log(err);
        alert('login failed!');
      }
      
    }


  return (
    <div>
    <div className='form-group'>
    <button className="bt" onClick={() => setIsSignVisible(false)} >Login!</button>
    <button className="bt" onClick={showSignForm}> sign up!</button>
    </div>
    
      {isSignVisible &&
      (
        <div className='form-container'>
          <h1 className="form-title">Sign Up</h1>
            <form onSubmit={handleSignUpSubmit} className="signup-form">
            <div className="form-group">
            <label>Email:</label>
                <input autoComplete='off' type="email" name="email" value={signUpformData.email} onChange={handleSignChange} placeholder='Enter your E-mail' required />
            </div>
            <div className='form-group'>
            <label>Password:</label>
                <input placeholder='Enter Password' type="password" name="password" value={signUpformData.password} onChange={handleSignChange} required />
                </div>
           <div className='form-group'>
            <label>Role: </label>
                <select name="role" value={signUpformData.role} onChange={handleSignChange}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
                </div>
            
            <button className="submit-button" type="submit">Sign Up</button>
        </form>
        </div>
      )}

      {!isSignVisible &&
      (
        <div className='form-container'>
          <h1 className='form-title'>Login</h1>
            <form className='login-form' onSubmit={handleLoginSubmit}>
              <div className='form-group'>
            <label>Email:</label>
                <input autoComplete='off' type="email" name="email" value={loginFormData.email} onChange={handleLoginChange} required />
                </div>
                <div className='form-group'>
            <label>Password:</label>
                <input type="password" name="password" value={loginFormData.password} onChange={handleLoginChange} required />
            </div>
            <button className='submit-button' type="submit">Login!</button>
              </form>

        </div>
      )}
</div>
    

);
}
export default HomePage;