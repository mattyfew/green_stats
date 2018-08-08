import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import AddFood from './AddFood'
import MainScreen from './MainScreen'
import SingleFood from './SingleFood'
import Nav from './Nav'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = { food: [] }
        this.handleChange = this.handleChange.bind(this)
        this.deleteFood = this.deleteFood.bind(this)
        this.addFoodToState = this.addFoodToState.bind(this)
    }

    componentDidMount() {
        axios.get('/food')
        .then(resp => this.setState({ food: resp.data }))
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    addFoodToState(newFood) {
        return new Promise((resolve, reject) => {
            const food = [ ...this.state.food ]
            food.push(newFood)
            this.setState({ food }, () => resolve())
        })
    }

    confirmDelete() {

    }

    deleteFood(id) {
        axios.post('/delete-food', { id })
        .then(resp => {
            if (resp.data.success) {
                this.setState({
                    food: this.state.food.filter(item => item._id != id)
                })
            }
        })
    }

    render() {
        const { food, modalIsOpen } = this.state
        const { handleChange, deleteFood } = this

        return (
            <BrowserRouter>
                <div>
                    <Nav />

                    <div id="content-container">
                        <Route exact path="/" render={ () => (
                            <MainScreen
                                food={ food }
                                deleteFood={ deleteFood }
                            />
                        )} />
                        <Route exact path="/add" render={p => (
                            <AddFood
                                historyPush={p.history.push}
                                addFoodToState={ this.addFoodToState}
                            />
                        )}/>
                        <Route exact path="/edit/:foodId" render={p => (
                            <SingleFood
                                foodId={p.match.params.foodId}
                                historyPush={p.history.push}
                            />
                        )} />
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default App
