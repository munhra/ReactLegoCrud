import { Toast, Button, Modal, Spinner, ToastContainer } from 'react-bootstrap'
import React from 'react'

export class LegoPartDeleteModal extends React.Component {
  constructor(props) {
    super()
    this.service = props.service
    this.state = {isSpinnerVisible: false, showInfoToast: false, messageWhenDeletingLegoPart: 'Lego part deleted with success.'}
  }

  handleClose() {
    this.props.handleDeleteLegoPartClose()
  }

  hideInfoToast() {
    this.setState({showInfoToast: false})
    this.props.handleDeleteLegoPartSave()
  }

  async handleDelete() {
    try {
      this.setState({isSpinnerVisible: true})
      await this.service.deleteLegoPartFromAPI(this.props.legoPartToDelete.id)
      this.setState({showInfoToast: true})
    } catch (error) {
      this.setState({isSpinnerVisible: false, showInfoToast: true, messageWhenDeletingLegoPart: 'Error when deleting lego part.'})
    }
  }

  render() {
    let spinner
    let footer
    if (this.state.isSpinnerVisible) {
      spinner = 
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    } else {
      footer = 
      <Modal.Footer>
        <Button variant='secondary' onClick={() => this.handleClose()}>Cancel</Button>
        <Button variant='primary' onClick={() => this.handleDelete()}>Delete</Button>
    </Modal.Footer>
    }

    return (
    <>
      <ToastContainer position='bottom-end'>
        <Toast onClose={() => this.hideInfoToast()} show={this.state.showInfoToast} delay={2000} autohide>
          <Toast.Header>
            LegoPart 
          </Toast.Header>
          <Toast.Body>
            {this.state.messageWhenDeletingLegoPart}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <Modal show={this.props.isDeleteLegoPart}>
        <Modal.Header>
          <Modal.Title>Delete Lego Part</Modal.Title>
          {spinner}
        </Modal.Header>
        <Modal.Body>
          <p> Are you sure to delete lego part "{this.props.legoPartToDelete.name}"</p>
        </Modal.Body>
        {footer}
      </Modal>
    </>
    )
  }
}