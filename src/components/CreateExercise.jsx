import React, { useState, useEffect } from "react";
import axios from 'axios';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Component = React.Component;
// import { Link } from "react-router-dom";

function CreateExercises() {
    const [ users, setUsers ] = useState({
        users: [],
        username: ''
    });

    const [ exercise, setExercise ] = useState({
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    });
    

    useEffect(()=>{
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if(response.data.length > 0){
                    setUsers({
                        users: response.data.map(user=> user.username),
                        username: response.data[0].username
                    })
                }
            })
    },[]);


    function onChangeUsername(e){
        setExercise({
            ...exercise,
            username: e.target.value
        });
    }
    function onChangeDescription(e){
        setExercise({
            ...exercise,
            description: e.target.value
        });
    }
    function onChangeDuration(e){
        setExercise({
            ...exercise,
            duration: e.target.value
        });
    }
    function onChangeDate(date){
        setExercise({
            ...exercise,
            date: date
        });
    }

    function onSubmit(e){
        e.preventDefault();

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data))
        
        window.location = '/';
    }
    return (
        <div className="create-exercises-content">
            <h3>Create New Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select 
                        required
                        className='form-control'
                        value={users.username}
                        onChange={onChangeUsername}>
                            {
                                users.users.map(function(user){
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
                        value={exercise.description}
                        onChange={onChangeDescription} />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={exercise.duration}
                        onChange={onChangeDuration} />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={exercise.date}
                            onChange={onChangeDate}
                        />
                    </div>
                </div>

                <div className="form-group mt-4">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
};

export default CreateExercises;