import React, { Component } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
Modal.setAppElement('main')

class SingleFood extends Component {
    constructor(props) {
        super(props)
        this.state = { singleFood: {} }
    }

    componentDidMount() {
        console.log("need to check props", this.props);
        axios.get(`/food/${this.props.foodId}`)
            .then(resp => {
                this.setState({ singleFood: resp.data })
            })
    }

    render() {
        const { _id, name, imgUrl, nutrition } = this.state.singleFood

        if (!_id) {
            return <div>Loading</div>
        }

        return (
            <Modal
                isOpen={true}
                contentLabel="Example Modal"
                onRequestClose={() => {
                    console.log("here");
                    this.setState({ modalIsOpen: false });
                }}
            >
                <div id="single-food">
                    <h2>{ name }</h2>
                    <img src={ imgUrl } />
                </div>
            </Modal>
        )
    }
}

export default SingleFood
