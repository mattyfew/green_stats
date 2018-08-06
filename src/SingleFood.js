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

        this.closeModal = this.closeModal.bind(this)
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

    closeModal() {
        this.setState({ modalIsOpen: false })
        this.props.historyPush('/')
    }

    render() {
        const { _id, name, imgUrl, nutrition,  } = this.state.singleFood

        if (!this.state.modalIsOpen) {
            return <div>Loading</div>
        }

        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={ this.closeModal }
            >
                <div id="single-food">
                    <p className="x" onClick={ this.closeModal }>X</p>
                    <h2>{ name }</h2>
                    <img src={ imgUrl } />
                </div>
            </Modal>
        )
    }
}

export default SingleFood
