import React from 'react'

function MainScreen(props) {
    console.log(props);
    return props.food.map(item => (
        <div className="single-food-container" key={ item._id }>
            <h2>{ item.name }</h2>
            <img src={ item.imgUrl } alt={ item.name } />
        </div>
    ))
}

export default MainScreen
