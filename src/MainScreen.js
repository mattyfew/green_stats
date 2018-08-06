import React from 'react'
import { Link } from 'react-router-dom'

function MainScreen(props) {
    return (
        <div id="main-food-container">
            {props.food.map(item => (
                <div className="single-food-container" key={ item._id }>
                    <p className="x" onClick={ () => props.deleteFood(item._id) }>X</p>
                    <Link to={`edit/${item._id }`}><h2>{ item.name }</h2></Link>
                    <Link to={`edit/${item._id }`}><img src={ item.imgUrl } alt={ item.name } /></Link>
                </div>
            ))}
        </div>
    )
}

export default MainScreen
