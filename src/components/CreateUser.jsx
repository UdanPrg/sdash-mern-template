import React, { useEffect, useState } from "react";
import axios from 'axios';
// import { Link } from "react-router-dom";

function CreateUser() {
    const [ user, setUser ] = useState('');

    function onChangeUsername(e){
        setUser( e.target.value );
    }

    function onSubmit(e){
        e.preventDefault();

        const sendUser = {
            username: user,
        }

        console.log(user);
        
        axios.post('http://localhost:5000/users/add', sendUser)
            .then(res => console.log(res.data));
        
        window.location = '/';
    }
    return (
        <div className="create-user-content">
            <h3>Create New User</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                    required
                    className="form-control"
                    value={user}
                    onChange={onChangeUsername} />
                </div>
                <div className="form-group mt-4">
                    <input type="submit" value="Creat User" className="btn-btn-primary" />
                </div>
            </form>
        </div>
    )
};

export default CreateUser;