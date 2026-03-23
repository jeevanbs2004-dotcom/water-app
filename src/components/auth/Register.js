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
        <div>
            <h2>Register</h2>

            {errorMessage && <p>{errorMessage}</p>}

            <input placeholder="Name"
                onChange={(e)=>setName(e.target.value)} />

            <input placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)} />

            <input type="password" placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)} />

            <input type="password" placeholder="Confirm Password"
                onChange={(e)=>setPasswordConf(e.target.value)} />

            <button onClick={registerUser}>Register</button>
        </div>
    );
}

export default Register;