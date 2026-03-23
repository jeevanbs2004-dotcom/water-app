import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    function registerUser() {
        const user = {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConf
        };

        axios.post('https://demo-blog.mashupstack.com/api/register', user)
        .then(() => {
            setErrorMessage('');
            navigate('/login');
        })
        .catch(error => {
            if (error.response?.data?.errors) {
                setErrorMessage(
                    Object.values(error.response.data.errors).join(' ')
                );
            } else {
                setErrorMessage("Registration failed");
            }
        });
    }

    return (
        <div className="container mt-3">
            <div className="col-6 mx-auto">

            <h2 className="text-center mb-3">Register</h2>

            {errorMessage && <p>{errorMessage}</p>}
             
            <div>
            <input 
                className="form-control mb-2"
                placeholder="Name"
                onChange={(e)=>setName(e.target.value)} />
            </div> 

            <div> 
            <input 
                className="form-control mb-2"
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)} />
            </div> 

            <div>
            <input 
                className="form-control mb-2"
                type="password" 
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)} />
            </div> 

            <div>
            <input
             className="form-control mb-2"
             type="password" 
             placeholder="Confirm Password"
                onChange={(e)=>setPasswordConf(e.target.value)} />

            <button className="btn btn-primary w-100" onClick={registerUser}>Register</button>
            </div>
        </div>
        </div>
    );
}

export default Register;