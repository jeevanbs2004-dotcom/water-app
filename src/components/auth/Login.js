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
        <div>
            <h2>Login</h2>

            {errorMessage && <p>{errorMessage}</p>}

            <input
                type="text"
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
            />

            <button onClick={attemptLogin}>Login</button>
        </div>
    );
}

export default Login;