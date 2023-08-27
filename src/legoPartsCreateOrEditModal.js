import React from 'react'
import { Toast, Button, Modal, Form, Spinner, ToastContainer } from 'react-bootstrap'
import PropTypes from 'prop-types'

export class LegoPartsCreateOrEditModal extends React.Component {
  constructor (props) {
    super(props)
    this.service = props.service
    if (this.props.isEditMode) {
      this.state = {
        legoPart: props.legoPartToEdit,
        isSpinnerVisible: false,
        showInfoToast: false,
        messageWhenAddingLegoPart: 'Lego part edited with success.'
      }
    } else {
      this.state = {
        legoPart: { name: '', description: '', part_number: '', color: '', image: '', quantity: 0 },
        isSpinnerVisible: false,
        showInfoToast: false,
        messageWhenAddingLegoPart: 'Lego part created with success.'
      }
    }
  }

  handleChange (event) {
    this.setState({ legoPart: { ...this.state.legoPart, [event.target.id]: event.target.value } })
  }

  handleClose () {
    this.props.handleAddLegoPartClose()
  }

  async handleSave () {
    try {
      this.setState({ isSpinnerVisible: true })
      const legoPartJSONString = JSON.stringify(this.state.legoPart)
      if (this.props.isEditMode) {
        await this.service.updateLegoPartFromAPI(legoPartJSONString, this.state.legoPart.id)
      } else {
        await this.service.createLegoPartFromAPI(legoPartJSONString)
      }
      this.setState({ showInfoToast: true })
    } catch (error) {
      const operation = this.props.isEditMode ? 'editing' : 'creating'
      this.setState({ isSpinnerVisible: false, showInfoToast: true, messageWhenAddingLegoPart: `Error when ${operation} lego part.` })
    }
  }

  hideInfoToast () {
    this.setState({ showInfoToast: false })
    this.props.handleAddLegoPartSave()
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
        <Button variant='primary' onClick={() => this.handleSave()}>Save changes</Button>
      </Modal.Footer>
    }

    const modalTitle = this.props.isEditMode ? 'Edit Lego Part' : 'Add Lego Part'

    return (
      <>
      <Modal show={this.props.showLegoPartForm}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
          {spinner}
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' data-testid="inputName" value={this.state.legoPart.name} onChange={event => this.handleChange(event)}/>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control type='text' data-testid="inputDescription" value={this.state.legoPart.description} onChange={event => this.handleChange(event)}/>
            </Form.Group>
            <Form.Group controlId='part_number'>
              <Form.Label>Part Number</Form.Label>
              <Form.Control type='text' data-testid="inputPart_number" value={this.state.legoPart.part_number} onChange={event => this.handleChange(event)}/>
            </Form.Group>
            <Form.Group controlId='quantity'>
              <Form.Label>Quantity</Form.Label>
              <Form.Control type='text' data-testid="inputQuantity" value={this.state.legoPart.quantity} onChange={event => this.handleChange(event)}/>
            </Form.Group>
            <Form.Group controlId='color'>
              <Form.Label>Color</Form.Label>
              <Form.Control type='text' data-testid="inputColor" value={this.state.legoPart.color} onChange={event => this.handleChange(event)}/>
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control type='text' data-testid="inputImage" value={this.state.legoPart.image} onChange={event => this.handleChange(event)}/>
            </Form.Group>
          </Modal.Body>
            {footer}
        </Form>
      </Modal>
      <ToastContainer className='p-3' position='bottom-end'>
        <Toast onClose={() => this.hideInfoToast()} show={this.state.showInfoToast} delay={2000} autohide>
          <Toast.Header>
            LegoPart
          </Toast.Header>
          <Toast.Body>
            {this.state.messageWhenAddingLegoPart}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
    )
  }
}

LegoPartsCreateOrEditModal.propTypes = {
  service: PropTypes.object,
  isEditMode: PropTypes.bool,
  legoPartToEdit: PropTypes.object,
  handleAddLegoPartClose: PropTypes.func,
  handleAddLegoPartSave: PropTypes.func, // as this function is called when editing it should have another name
  showLegoPartForm: PropTypes.bool
}
