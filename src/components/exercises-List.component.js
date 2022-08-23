import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => {
    <tr>
        <td>{props.Exercise.username}</td>
        <td>{props.Exercise.description}</td>
        <td>{props.Exercise.duration}</td>
        <td>{props.Exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.Exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.Exercise._id) }}>delete</a>
        </td>
    </tr>
}

export default class ExercisesList extends Component {
    constructor(props) {
      super(props);

      this.deleteExercise = this.deleteExercise.bind(this);

      this.state = {exercises: []};
    } 

    componentDidMount() {
        axios.get('http://localhost:5000/exe/')
          .then(Response => {
            this.setState({ exercises: Response.data })
          })
          .catch((error) => {
            console.log(error);
          })
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exe/'+id)
          .then(res => console.log(res.data));

        this.setState({
            exercises: this.state.exercises.filter (el => el._id !== id)
        })
    }

    ExerciseList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise Exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
    }

    render() {
        return (
             <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.ExerciseList() }
                    </tbody>
                </table>
             </div>
        )
    }
}