import React from "react";
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
                |{" "}
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

class ListExercises extends Component{
    constructor(props){
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []}
    }
    
    componentDidMount() {
        axios.get(urlBase + 'exercises')
            .then(response => {
                this.setState({ exercises: response.data })
            })
            .catch((error)=> {
                console.log(error);
            })
    }
    deleteExercise(id){
        axios.delete(urlBase + 'exercises/' + id)
            .then(res => console.log(res.data));

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList(){
        return this.state.exercises.map(currentExercise => {
                return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id} />
        })
    }

    render(){
        return (
            <div className="list-exercises-content container-fluid p-5">
                <div className="col-12 col-md-4">
                    <h3>Logged Exercises</h3>
                    <table className="table">
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
                            { this.exerciseList() }
                        </tbody>
                    </table>
                </div>
            </div>
        )

    }
};

export default ListExercises;