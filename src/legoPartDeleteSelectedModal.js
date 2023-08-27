import { Toast, Button, Modal, Spinner, ToastContainer } from 'react-bootstrap'
import React from 'react'
import PropTypes from 'prop-types'

// is it possible to create a generic class to use as mother class for both this and legoPartDeleteModal ?
export class LegoPartDeleteSelectedModal extends React.Component {
  constructor (props) {
    super()
    this.legoPartsToDelete = props.legoPartsToDelete
    this.service = props.service
    // include plural on the text below
    this.state = { isSpinnerVisible: false, showInfoToast: false, messageWhenDeletingLegoPart: 'Selected lego parts deleted with success.' }
  }

  handleClose () {
    this.props.handleDeleteSelectedLegoPartsClose()
  }

  hideInfoToast () {
    this.setState({ showInfoToast: false })
    this.props.handleDeleteSelectedLegoPartsSave()
  }

  async handleDelete () {
    try {
      this.setState({ isSpinnerVisible: true })
      const selectedLegoPartIDs = {}
      selectedLegoPartIDs.ids = this.props.selectedLegoParts.map(legoPart => legoPart.id)
      await this.service.deleteLegoPartsFromAPI(selectedLegoPartIDs)
      this.setState({ showInfoToast: true })
    } catch (error) {
      this.setState({ isSpinnerVisible: false, showInfoToast: true, messageWhenDeletingLegoPart: 'Error when deleting one or more lego parts.' })
    }
  }

  render () {
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
        <Button data-testid='selectedPartDeleteButton' variant='primary' onClick={() => this.handleDelete()}>Delete</Button>
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
        <Modal show={this.props.isDeleteSelectedLegoParts}>
          <Modal.Header>
            <Modal.Title>Delete Selected Lego Part(s)</Modal.Title>
            {spinner}
          </Modal.Header>
          <Modal.Body>
            <p> Are you sure to delete selected lego part(s) ? </p>
          </Modal.Body>
          {footer}
        </Modal>
      </>
    )
  }
}

LegoPartDeleteSelectedModal.propTypes = {
  service: PropTypes.object,
  handleDeleteSelectedLegoPartsClose: PropTypes.func,
  handleDeleteSelectedLegoPartsSave: PropTypes.func,
  selectedLegoParts: PropTypes.array,
  legoPartsToDelete: PropTypes.func,
  isDeleteSelectedLegoParts: PropTypes.bool
}
