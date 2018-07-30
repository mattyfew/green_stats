import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import AddFood from './AddFood'

class App extends Component {
    constructor() {
        super()

        this.state = {
            food: []
        }
    }

    componentDidMount() {
        axios.get('/food')
            .then(resp => {
                this.setState({
                    food: resp.data
                })
            })
    }

    renderFood(food) {
        return this.state.food.map(item => (
            <div className="single-food-container" key={ item._id }>
                <h2>{ item.name }</h2>
                <img src={ item.imgUrl } alt={ item.name } />
            </div>
        ))
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
                        <Link to="/">Main</Link>
                        <Link to="/add">Add</Link>
                        
                        <Route exact path="/" render={ () => (
                                <div id="main-food-container">
                                    { this.renderFood() }
                                </div>
                            ) } />
                        <Route exact path="/add" component={ AddFood } />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default App
