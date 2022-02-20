import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from './Alert';

const Login = (props) => {

    const navigate = useNavigate();
    const show = useContext(AlertContext);
    const { loggedin ,setloggedin } = props;

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const onchange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const validate_user = async (e) => {
        e.preventDefault();
        const request = {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }

        let response = await fetch(`/auth/login`, request);
        if (response.status !== 200){
            show('info', 'please try again after some time...');
        }
        else {
            setloggedin(true);
            response = await response.json();
            localStorage.setItem('auth-token' ,response.auth_token );
            navigate('/');
            show('success', 'successfully logged in...');
        }
    }

    return (
        <>
            <form onSubmit={validate_user} >
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                    <input type="email" className="form-control" name="email" value={user.email} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={user.password} onChange={onchange} />
                </div>
                <div className="mb-3 form-check">
                    <label>
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                    </label>

                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </>
    )
}

export default Login;