import React from 'react';
import { Toast, Button, Modal, Form, Navbar, Table, Spinner, ToastContainer } from 'react-bootstrap';
import { Service } from './service';

export class LegoPartsCreateOrEditModal extends React.Component {
  constructor(props) {
    super(props)
    this.service = new Service()
    console.log("### constructor this.props.isEditMode "+this.props.isEditMode)
    if (this.props.isEditMode) {
      this.state = {legoPart: props.legoPartToEdit,
                    isSpinnerVisible: false,
                    showInfoToast: false,
                    messageWhenAddingLegoPart: 'Lego part edited with success.'}
    } else {
      this.state = {legoPart: {name:'', description:'', part_number: '', color: '', image: '', quantity: 0}, 
                  isSpinnerVisible: false,
                  showInfoToast: false,
                  messageWhenAddingLegoPart: 'Lego part created with success.'}
    }
  }

  handleChange(event) {
    this.setState({legoPart: {...this.state.legoPart, [event.target.id]: event.target.value}})
  }

  handleClose() {
    this.props.handleAddLegoPartClose()
  }

  async handleSave() {
    try {
      console.log('##### this.props.isEditMode '+this.props.isEditMode)
      this.setState({isSpinnerVisible: true})
      let legoPartJSONString = JSON.stringify(this.state.legoPart)
      if (this.props.isEditMode) {
        await this.updateLegoPart(legoPartJSONString, this.state.legoPart.id)
      } else {
        await this.createLegoPart(legoPartJSONString)
      }
      this.setState({showInfoToast: true})
    } catch (error) {
      let operation = this.props.isEditMode ? 'editing' : 'creating'
      this.setState({isSpinnerVisible: false, showInfoToast: true, messageWhenAddingLegoPart: `Error when ${operation} lego part.`})
    }
  }

  async createLegoPart(legoPartJSONString) {
    console.log('createLegoPart')
    this.service.createLegoPartFromAPI(legoPartJSONString)
  }

  async updateLegoPart(legoPartJSONString, legoPartId) {
    console.log('updateLegoPart with id '+legoPartId)
    this.service.updateLegoPartFromAPI(legoPartJSONString, legoPartId)
  }

  hideInfoToast() {
    this.setState({showInfoToast: false})
    this.props.handleAddLegoPartSave()
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
        <Button variant='primary' onClick={() => this.handleSave()}>Save changes</Button>
      </Modal.Footer>
    }

    return (
      <>
      <Modal show={this.props.showLegoPartForm}>
        <Modal.Header>
          <Modal.Title>Add Lego Part</Modal.Title>
          {spinner}
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' value={this.state.legoPart.name} onChange={event => this.handleChange(event)}/>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control type='text' value={this.state.legoPart.description} onChange={event => this.handleChange(event)}/>
            </Form.Group>
            <Form.Group controlId='part_number'>
              <Form.Label>Part Number</Form.Label>
              <Form.Control type='text' value={this.state.legoPart.part_number} onChange={event => this.handleChange(event)}/>
            </Form.Group>
            <Form.Group controlId='quantity'>
              <Form.Label>Quantity</Form.Label>
              <Form.Control type='text' value={this.state.legoPart.quantity} onChange={event => this.handleChange(event)}/>
            </Form.Group>
            <Form.Group controlId='color'>
              <Form.Label>Color</Form.Label>
              <Form.Control type='text' value={this.state.legoPart.color} onChange={event => this.handleChange(event)}/>
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control type='text' value={this.state.legoPart.image} onChange={event => this.handleChange(event)}/>
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