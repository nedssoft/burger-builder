import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux';

const WithErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentDidMount() {
      axios.interceptors.request.use(request => {
        this.setState({error: null})
        return request;
      })
      axios.interceptors.response.use(res => res, error => {
        this.setState({error});
      })
    }
    errorConfirmedHandler = () => {
      this.setState({error: null})

    }
    render() {
      const { error } = this.state

      return (
        <Aux>
          <Modal show={error} closeModal={this.errorConfirmedHandler}>
            {error? error.message : null }
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default WithErrorHandler