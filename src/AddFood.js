import React, { Component } from 'react'
import axios from 'axios'

class AddFood extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            emoji: ''
        }
        this.submitNewFood = this.submitNewFood.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitNewFood(e) {
        e.preventDefault()
        const { name, emoji } = this.state

        axios.post('/new-food', { name, emoji })
        .then(resp => this.props.addFoodToState(resp.data))
        .then(() => this.props.historyPush('/'))
    }

    render() {
        return (
            <div>
                <h1>Add New Form</h1>

                <form onSubmit={ this.submitNewFood }>
                    <input onChange={ this.handleChange } type="text" name="name" placeholder="food name"/>
                    <input onChange={ this.handleChange } type="text" name="emoji" placeholder="enter an emoji"/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default AddFood
