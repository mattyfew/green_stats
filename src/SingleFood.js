import React, { Component } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
Modal.setAppElement('main')

class SingleFood extends Component {
    constructor(props) {
        super(props)
        this.state = {
            singleFood: {},
            modalIsOpen: false,
            showAddStat: false,
            newStatName: '',
            newStatAmount: ''
        }
        this.closeModal = this.closeModal.bind(this)
        this.addStat = this.addStat.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        axios.get(`/food/${this.props.foodId}`)
            .then(resp => {
                this.setState({
                    singleFood: resp.data,
                    modalIsOpen: true
                })
            })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    closeModal() {
        this.setState({ modalIsOpen: false })
        this.props.historyPush('/')
    }

    addStat(e) {
        e.preventDefault()

        const { newStatName, newStatAmount } = this.state

        axios.post(`/add-stat/${this.props.foodId}`, { newStatName, newStatAmount })
        .then(resp => {
            console.log("so we are here now")
        })
    }

    render() {
        const { _id, name, imgUrl, nutrition  } = this.state.singleFood
        const { showAddStat, modalIsOpen } = this.state

        if (!modalIsOpen) { return (<div>Loading</div>) }

        return (
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={ this.closeModal }
            >
                <div id="single-food">
                    <p className="x" onClick={ this.closeModal }>X</p>
                    <h2>{ name }</h2>
                    <p className="emoji">{ imgUrl }</p>
                    <button onClick={() => this.setState({ showAddStat: !showAddStat })}>Add Stat</button>

                    { showAddStat && (
                        <form onSubmit={ this.addStat }>
                            <h3>Add Stat</h3>
                            <input onChange={ this.handleChange } type="text" name="newStatName" placeholder="name"/>
                            <input onChange={ this.handleChange } type="text" name="newStatAmount" placeholder="amount"/>
                            <button>Submit</button>
                        </form>
                    )}
                </div>
            </Modal>
        )
    }
}

export default SingleFood
