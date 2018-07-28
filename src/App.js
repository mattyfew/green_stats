import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
    constructor() {
        super()

        this.state = {
            food: []
        }
    }

    componentDidMount() {
        axios.get('/food').then(resp => {
            const url = `https://api.nal.usda.gov/ndb/V2/reports/?ndbno=${ resp.data.join('&ndbno=') }&api_key=MWFXXil4cNHuolFhHn2Rq9QX0ivKJkwmrEmEwihH`

            axios.get(url)
            .then(resp => {
                this.setState({
                    food: resp.data.foods.map(item => item.food)
                })
            })
        })

    }

    renderFood(food) {
        return food.map(item => (
            <div className="single-food-container" key={ item.id }>
                <h2>{ item.name }</h2>
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

                { this.renderFood(this.state.food) }
            </div>
        )
    }
}

export default App
