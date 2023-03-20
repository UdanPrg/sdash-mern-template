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

    useEffect(()=>{
        console.table(exercise)
    }, [exercise])

    function onChangeUsername(e){
        setExercise({
            ...exercise,
            username: e.target.value
        })
    }
    function onChangeDescription(e){
        setExercise({
            ...exercise,
            description: e.target.value
        })
    }
    function onChangeDuration(e){
        setExercise({
            ...exercise,
            duration: Number(e.target.value)
        })
    }
    function onChangeDate(date){
        setExercise({
            ...exercise,
            date
        })
    }

    function onSubmit(e){
        e.preventDefault();

        console.log(exercise);

        axios.post(`http://localhost:5000/exercises/update/${exercise_id}`, exercise)
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
                            value={exercise.username}
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
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    
};

export default EditExercises;