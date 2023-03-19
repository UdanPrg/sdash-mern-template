import React from "react";
import axios from 'axios';
const Component = React.Component;
// import { Link } from "react-router-dom";

class CreateUser extends Component {
    constructor(props){
        super(props);


        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            username: ''
        }
    }
    
    onChangeUsername(e){
        this.setState({
            username: e.target.value,
        });
    }

    onSubmit(e){
        e.preventDefault();

        const user = {
            username: this.state.username,
        }

        console.log(user);
        
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));
        
        this.setState({
            username: ''
        })
    }
    render(){
        return (
            <div className="create-user-content">
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername} />
                    </div>
                    <div className="form-group mt-4">
                        <input type="submit" value="Creat User" className="btn-btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
};

export default CreateUser;