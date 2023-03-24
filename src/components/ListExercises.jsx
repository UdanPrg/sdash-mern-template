import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Component = React.Component;
const urlBase = 'http://localhost:5000/'

const Exercise = (props) => {
    const exercise = props.exercise;
    console.log(exercise._id);
    if (!exercise || !exercise._id) {
        return null;
    }

    return (
        <tr>
            <td>{exercise.username}</td>
            <td>{exercise.description}</td>
            <td>{exercise.duration}</td>
            <td>{exercise.date.substring(0, 10)}</td>
            <td>
                <Link
                    to={`/edit/${props.exercise._id}`}
                    state={{ exercise_id: props.exercise._id }}
                >
                    edit
                </Link>
                <span> | </span>
                <button
                    onClick={() => {
                        props.deleteExercise(props.exercise._id);
                    }}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};


function ListExercises() {    

    const [exercises, setExercises] = useState([]);

    useEffect(()=>{
        axios.get(urlBase + 'exercises')
        .then(response => {
            setExercises(response.data)
        })
        .catch((error)=> {
            console.log(error);
        })
    },[])

    function deleteExercise(id){
        axios.delete(urlBase + 'exercises/' + id)
            .then(res => console.log(res.data));

        setExercises( exercises.filter(el => el._id !== id) )
    }

    function exerciseList(){
        // console.log(typeof(exercises));
        return exercises.map(currentExercise => {
                return <Exercise exercise={currentExercise} deleteExercise={deleteExercise} key={currentExercise._id} />
        })
    }
    return (
        <div className="list-exercises-content container-fluid p-5">
            <div className="col-12">
                <h3>Logged Exercises</h3>
                <table className="table table-striped">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exerciseList() }
                    </tbody>
                </table>
            </div>
        </div>
    )

};

export default ListExercises;