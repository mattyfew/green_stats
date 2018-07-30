import React, { Component } from 'react'
import axios from 'axios'
import AddFood from './AddFood'

class App extends Component {
    constructor() {
        super()

        this.state = {
            food: []
        }
    }

    // componentDidMount() {
    //     axios.get('/food').then(resp => {
    //         const url = `https://api.edamam.com/api/nutrition-data?app_id=8143e372&app_key=2888a156d293bb3d699077400ffbb538&ingr=1%20cucumber`
    //
    //         axios.get(url)
    //         .then(resp => {
    //             console.log(resp.data);
    //             this.setState({
    //                 food: resp.data.foods.map(item => item.food)
    //             })
    //         })
    //     })
    // }

    renderFood(food) {
        return food.map(item => (
            <div className="single-food-container" key={ item.id }>
                <h2>{ item.name }</h2>
            </div>
        ))
    }

    render() {
        // if (!this.state.food.length) {
        //     return (<h1>Loading...</h1>)
        // }

        return (
            <div>
                <h1>Green Stats</h1>

                <AddFood />
            </div>
        )
    }
}

export default App
