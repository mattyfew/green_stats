import React, { Component } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
Modal.setAppElement('main')

class SingleFood extends Component {
    constructor(props) {
        super(props)
        this.state = {
            singleFood: {},
            modalIsOpen: false
        }
    }

    componentDidMount() {
        axios.get(`/food/${this.props.foodId}`)
            .then(resp => {
                console.log("need to check props", resp);

                this.setState({
                    singleFood: resp.data,
                    modalIsOpen: true
                })
            })
    }

    render() {
        const { _id, name, imgUrl, nutrition,  } = this.state.singleFood

        if (!this.state.modalIsOpen) {
            return <div>Loading</div>
        }

        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={() => {
                    this.setState({ modalIsOpen: false });
                    this.props.historyPush('/')
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
