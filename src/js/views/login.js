import React, {useContext, useState} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError,setLoginError] = useState(false);
    const {actions} = useContext(Context);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isLogged = await actions.login(email, password);
        if (isLogged){
            console.log('Login successful');
            navigate('/users/favorites');
        } else {
            setLoginError(true);
            console.log('Login failed');
        }
    };

    return (
        <form className = "m-3" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="inputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="inputEmail" placeholder="email@host.com" required onChange={(event) => { setEmail(event.target.value) }} />
            </div>
            <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="inputPassword" required onChange={(event) => { setPassword(event.target.value) }}/>
            </div>
            {loginError ? <div className="text-danger mb-3">Wrong email or password</div> : null}
            <button type="submit" className="btn btn-primary btn-lg">Log In</button>
        </form>
    )
};

