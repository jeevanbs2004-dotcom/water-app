import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function attemptLogin() {
        axios.post('https://demo-blog.mashupstack.com/api/login', {
            email: email,
            password: password
        })
        .then(response => {
            setErrorMessage('');

            const user = {
                email: email,
                token: response.data.token
            };

            dispatch(setUser(user));
            navigate('/');
        })
        .catch(error => {
            if (error.response?.data?.errors) {
                setErrorMessage(
                    Object.values(error.response.data.errors).join(' ')
                );
            } else if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Login failed");
            }
        });
    }

    return (
        <div className="container mt-3">
            <div className="col-6 mx-auto">
            
            
             <h2 className="text-center">Login</h2>
            

             {errorMessage && (
    <div className="alert alert-danger">
        {errorMessage}
    </div>
)}
              
             <div>
               <input 
               className="form-control mb-2"
                type="text"
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
               />
             </div> 
             
             <div>
              <input
              className="form-control mb-2"
                type="password"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
              />
             </div> 

             <button className="btn btn-primary" onClick={attemptLogin}>Login</button>
            </div>    
        </div>
    );
}

export default Login;