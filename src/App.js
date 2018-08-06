import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import AddFood from './AddFood'
import MainScreen from './MainScreen'
import SingleFood from './SingleFood'
import Nav from './Nav'

class App extends Component {
    constructor() {
        super()

        this.state = {
            food: [],
            formName: '',
            formImgUrl: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.submitNewFood = this.submitNewFood.bind(this)
        this.deleteFood = this.deleteFood.bind(this)
    }

    componentDidMount() {
        axios.get('/food')
            .then(resp => this.setState({ food: resp.data }))
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitNewFood(e) {
        e.preventDefault()

        axios.post('/new-food', {
            name: this.state.formName,
            imgUrl: this.state.formImgUrl
        })
        .then(resp => {
            this.setState({
                food: [ ...this.state.food ].push(resp.data)
            }, () => location.replace('/'))
        })
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
        const { food, formName, formImgUrl, modalIsOpen } = this.state
        const { handleChange, submitNewFood, deleteFood } = this

        // if (!food.length) { return (<h1>Loading...</h1>) }

        return (
            <BrowserRouter>
                <div>
                    <Nav />

                    <div id="content-container">
                        <h1>Green Stats</h1>

                        <Route exact path="/" render={ () => <MainScreen food={ food } deleteFood={ deleteFood } /> } />
                        <Route exact path="/add" render={ () => (
                            <AddFood
                                formName={ formName }
                                formImgUrl={ formImgUrl }
                                handleChange={ handleChange }
                                submitNewFood={ submitNewFood }
                            />
                        )}/>
                    <Route exact path="/edit/:foodId" render={p => {
                        return (
                            <SingleFood
                                foodId={p.match.params.foodId}
                                historyPush={p.history.push}
                            />
                    )}} />
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default App
