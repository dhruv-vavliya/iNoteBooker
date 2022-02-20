import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from './Alert';


const Signup = () => {

    const navigate = useNavigate();
    const show = useContext(AlertContext);

    const [user, setUser] = useState({
        username: "",
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

        let response = await fetch(`/auth/register`, request);
        if (response.status !== 200) {
            show('info', 'please try again after some time...');
        }
        else{
            navigate('/login');
            show('success', 'now you are part of iNoteBook...');
        }
    }

    return (
        <>
            <form onSubmit={validate_user} >

                <div className="mb-3">
                    <label className="form-label" >Username</label>
                    <input type="username" className="form-control" name="username" value={user.username} onChange={onchange} aria-describedby="emailHelp" required />
                </div>                
                <div className="mb-3">
                    <label className="form-label" >Email address</label>
                    <input type="email" className="form-control" name="email" value={user.email} onChange={onchange} aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={user.password} onChange={onchange} required />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </>
    )
}

export default Signup;
