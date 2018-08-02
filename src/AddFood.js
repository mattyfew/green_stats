import React from 'react'

function AddFood(props) {
    return (
        <div>
            <h1>Add New Form</h1>

            <form onSubmit={ props.submitNewFood }>
                <input onChange={ props.handleChange } type="text" name="formName" placeholder="food name"/>
                <input onChange={ props.handleChange } type="text" name="formImgUrl" placeholder="enter an image URL"/>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default AddFood
