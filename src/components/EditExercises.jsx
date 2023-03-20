import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


function EditExercises () {
    const [exercise, setExercise] = useState({
        username: "",
        description: "",
        duration: 0,
        date: new Date()
    })

    const [username, setUsername] = useState("");;
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());

    const [users, setUsers] = useState([])

    // console.log('Respuesta: ' + this.props.location);
    
    
    let { exercise_id } = useLocation().state;

    useEffect (()=> {
        axios.get(`http://localhost:5000/exercises/${exercise_id}`)
        .then(response => {
            console.log(response)
            setExercise({
                username: response.data.username,
                description: response.data.description,
                duration: response.data.duration,
                date: new Date(response.data.date)
            })
        })
        .catch(function(error){
            console.log(error);
        })

    axios.get('http://localhost:5000/users/')
        .then(response => {
            if(response.data.length > 0){
                setUsers(response.data.map(user=> user.username))
            }
        })
        .catch((error) => {
            console.log(error);
        })
    
    },[])


    function onChangeUsername(e){
        setUsername(e.target.value)
    }
    function onChangeDescription(e){
        setDescription(e.target.value)
    }
    function onChangeDuration(e){
        setDuration(e.target.value)
    }
    function onChangeDate(date){
        setDate(date)
    }

    function onSubmit(e){
        e.preventDefault();

        setExercise({
            username: username,
            description: description,
            duration: duration,
            date: date
        })
        console.log(exercise);

        axios.post('http://localhost:5000/exercises/update/641533fdbd87836209041827', exercise)
            .then(res => console.log(res.data));
        
        window.location = '/';
    }

        return (
            <div className="edit-exercises-content">
                <h3>Edit Exercise Log</h3>
                <form onSubmit={onSubmit }>
                    <div className="form-group">
                        <label>Username: </label>
                        <select
                            required
                            className='form-control'
                            value={username}
                            onChange={onChangeUsername}>
                                {
                                    users.map(function(user){
                                        return <option
                                            key={user}
                                            value={user}>
                                                {user}
                                        </option>
                                    })
                                }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={description}
                            onChange={onChangeDescription} />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={duration}
                            onChange={onChangeDuration} />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={date}
                                onChange={onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group mt-4">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    
};

export default EditExercises;