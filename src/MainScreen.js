import React from 'react'

function MainScreen(props) {
    return (
        <div id="main-food-container">
            {props.food.map(item => (
                <div className="single-food-container" key={ item._id }>
                    <p onClick={ () => props.deleteFood(item._id) }>X</p>
                    <h2>{ item.name }</h2>
                    <img src={ item.imgUrl } alt={ item.name } />
                </div>
            ))}
        </div>
    )
}

export default MainScreen
