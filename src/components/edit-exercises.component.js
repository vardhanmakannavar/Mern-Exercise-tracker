//import { render } from "@testing-library/react";
import React, { Component } from "react";
import axios from 'axios';
import DatePicker from "react-datepicker";
//import "react-datepicker/dist/DatePicker.css";

export default class EditExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangedescription = this.onChangedescription.bind(this);
        this.onChangeduration = this.onChangeduration.bind(this);
        this.onChangedate = this.onChangedate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exe/'+this.props.matchparms.id)
          .then(Response => {
                this.setState({
                    username: Response.data.username,
                    description: Response.data.description,
                    duration: Response.data.duration,
                    date: new Date(Response.data.date)
                })
          })
          .catch(function (error) {
             console.log(error);
          })


        axios.get('http://localhost:5000/users/')
          .then(Response => {
            if(Response.data.length > 0) {
                this.setState({
                    users: Response.data.map(User => User.username),
                })
            }
          })
    }

    onChangeUsername(e) {
      this.setState({
        username: e.target.value
      });
    }

    onChangedescription(e) {
      this.setState({
        description: e.target.value
      });
    }

    onChangeduration(e) {
        this.setState({
          duration: e.target.value
        });
      }

      onChangedate(date) {
        this.setState({
          date: date
        });
      }

      onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise);

        axios.post('http://localhost:5000/exe/update/'+this.props.match.prams.id,exercise)
           .then(res => console.log(res.data));

        window.location = '/';

      } 


render() {
    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit ={this.onSubmit}>
                <div className="form-group">
                    <lable>Username: </lable>
                    <select ref="userInput"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}>
                        {
                            this.state.users.map(function(user) {
                                return <option
                                key={user}
                                value={user}>{user}
                                </option>
                            })
                        }
                    </select>    
                </div>
                <div className="form-group">
                    <lable>Description: </lable>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangedescription} />
                </div>
                <div className="form-group">
                    <lable>Duration(in minutes): </lable>
                    <input type="text"
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeduration} />
                </div>
                <div className="form-group">
                    <lable>Date: </lable>
                    <div>
                        <DatePicker
                           selected = {this.state.date}
                           onChange = {this.onChangedate}
                    />       
                   </div> 
                </div>

                <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
 }
}