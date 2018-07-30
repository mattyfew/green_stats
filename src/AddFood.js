import React, { Component } from 'react'
import axios from 'axios'


class AddFood extends Component {
    constructor() {
        super()

        this.state = {
            name: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.submitNewFood = this.submitNewFood.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitNewFood() {
        axios.post('/new-food', this.state)
            .then(resp => {
                console.log(resp.data);
            })
    }

    render() {
        return (
            <div>
                <h1>Add New Form</h1>

                <form onSubmit={ this.submitNewFood }>
                    <input onChange={ this.handleChange } type="text" name="name" placeholder="food name"/>
                    <input onChange={ this.handleChange } type="text" name="imgUrl" placeholder="enter an image URL"/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default AddFood
