import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import AddFood from './AddFood'
import MainScreen from './MainScreen'
import EditFood from './EditFood'

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

    render() {
        if (!this.state.food.length) {
            return (<h1>Loading...</h1>)
        }

        return (
            <div>
                <h1>Green Stats</h1>

                <BrowserRouter>
                    <div>
                        <Link className="nav-link" to="/">Main</Link>
                        <Link className="nav-link" to="/add">Add</Link>

                        <Route exact path="/" render={ () => <MainScreen food={ this.state.food } /> } />
                        <Route exact path="/add" render={ () => (
                            <AddFood
                                formName={ this.state.formName }
                                formImgUrl={ this.state.formImgUrl }
                                handleChange={ this.handleChange }
                                submitNewFood={ this.submitNewFood }
                            />
                        )} />
                        <Route exact path="/edit/:foodId" component={ EditFood } />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default App
