import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toast, Button, Modal, Form, Navbar, Table, Spinner, ToastContainer } from 'react-bootstrap';
import { Service } from './service';
import { Utilities } from './utilities';
import './index.css';

class LegoPartsCRUD extends React.Component {
  render() {
    return (
      <>
        <LegoPartsNavbar />
      </>
    )
  }
}

class LegoPartsNavbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isAddLegoPart: false, isDeleteLegoParts: false}
    this.handleAddLegoPartClose = this.handleAddLegoPartClose.bind(this)
    this.handleAddLegoPartSave = this.handleAddLegoPartSave.bind(this)
    this.handleDeleteLegoPartClose = this.handleDeleteLegoPartClose.bind(this)
    this.handleDeleteLegoPartSave = this.handleDeleteLegoPartSave.bind(this)
  }

  deleteLegoParts() {
    this.setState({isDeleteLegoParts: true})
  }

  addLegoPart() {
    this.setState({isAddLegoPart: true})
  }

  handleAddLegoPartClose() {
    this.setState({isAddLegoPart: false})
  }

  async handleAddLegoPartSave() {
    let legoParts = await fetchAllLegoPartsFromAPI()
    // implement error handling for this
    this.setState({isAddLegoPart: false, legoParts: legoParts})
  }

  handleDeleteLegoPartClose() {
    this.setState({isDeleteLegoParts: false})
  }

  async handleDeleteLegoPartSave() {
    let legoParts = await fetchAllLegoPartsFromAPI()
    this.setState({isAddLegoPart: false, isDeleteLegoParts: false, legoParts: legoParts})
  }

  render() {
    let addLegoPartModal
    let deleteLegoPartModal

    if (this.state.isAddLegoPart) {
      addLegoPartModal = <LegoPartsCreateOrEditModal 
        isAddLegoPart={this.state.isAddLegoPart} 
        handleAddLegoPartClose={this.handleAddLegoPartClose}
        handleAddLegoPartSave={this.handleAddLegoPartSave}
      />
    }

    if (this.state.isDeleteLegoParts) {
      deleteLegoPartModal = <LegoPartDeleteModal
        isDeleteLegoPart={this.state.isDeleteLegoParts}
        handleDeleteLegoPartClose={this.handleDeleteLegoPartClose}
        handleDeleteLegoPartSave={this.handleDeleteLegoPartSave}
      />
    }
    
    return(
      <>
      <Navbar className='navbar navbar-expand-lg bg-light'>
        <div className='container-fluid'>
          <p className='navbar-brand'>Lego Part CRUD</p>
          <Button className='navbar-toggler' type='button'>
          </Button>
          <div className='collapse navbar-collapse'>
            <div className='d-flex'>
              <Button className='btn btn-danger ms-1' type='button' onClick={() => this.deleteLegoParts()}>Delete</Button>
              <Button className='btn btn-success ms-1' type='button' onClick={() => this.addLegoPart()}>Add New Lego Part</Button>
            </div>
          </div>
        </div>
      </Navbar>
      {addLegoPartModal}
      {deleteLegoPartModal}
      <LegoPartsTable legoParts={this.state.legoParts} handleDeleteLegoPartSave={this.handleDeleteLegoPartSave} />
      </>
    )
  }
}

class LegoPartDeleteModal extends React.Component {
  constructor(props) {
    super()
    this.service = new Service()
    this.state = {isSpinnerVisible: false, showInfoToast: false, messageWhenDeletingLegoPart: 'Lego part deleted with success.'}
  }

  componentDidMount() { 
    console.log('componentDidMount LegoPartDeleteModal showInfoToast '+this.state.showInfoToast)
  }

  componentWillUnmount() { 
    console.log('componentWillUnmount LegoPartDeleteModal '+this.state.showInfoToast)
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
    console.log('render show info toast '+this.state.showInfoToast)
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

class LegoPartsCreateOrEditModal extends React.Component {
  constructor(props) {
    super(props)
    this.service = new Service()
    this.state = {legoPart: {name:'', description:'', part_number: '', color: '', image: '', quantity: 0}, 
                  isSpinnerVisible: false, showInfoToast: false, messageWhenAddingLegoPart: 'Lego part created with success.'}
  }

  handleChange(event) {
    this.setState({legoPart: {...this.state.legoPart, [event.target.id]: event.target.value}})
  }

  handleClose() {
    this.props.handleAddLegoPartClose()
  }

  async handleSave() {
    try {
      this.setState({isSpinnerVisible: true})
      let legoPartJSONString = JSON.stringify(this.state.legoPart)
      console.log(legoPartJSONString)
      await this.service.createLegoPartFromAPI(legoPartJSONString)
      this.setState({showInfoToast: true})
    } catch (error) {
      this.setState({isSpinnerVisible: false, showInfoToast: true, messageWhenAddingLegoPart: 'Error when creating lego part.'})
    }
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
      <Modal show={this.props.isAddLegoPart}>
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

class LegoPartsTable extends React.Component {
  constructor() {
    super()
    this.state = {legoParts: [], legoPartToDelete: {}}
    this.service = new Service()
    this.utilities = new Utilities()

    this.handleDeleteLegoPartClose = this.handleDeleteLegoPartClose.bind(this)
    this.handleDeleteLegoPartSave = this.handleDeleteLegoPartSave.bind(this)
  }

  async componentDidMount() {
    let legoParts = await fetchAllLegoPartsFromAPI()
    // error handling needs to be implemented
    this.setState({legoParts: legoParts})
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.legoParts === undefined) {
      return null
    }
    return {
      legoParts: nextProps.legoParts
    }
  }

  editLegoPart() {
    console.log('Edit lego part !!')
  }

  deleteLegoPart(legoPart) {
    console.log('deleteLegoPart')
    this.setState({isDeleteLegoPart: true, legoPartToDelete: legoPart})
  }

  selectLegoPartOnClick(event) {
    console.log('Select lego part on click !! '+event.target.checked)
  }
  
  selectAllLegoPartsOnClick(event) {
    console.log('Select all lego parts on click !! '+event.target.checked)
  }

  handleDeleteLegoPartClose() {
    console.log('handleDeleteLegoPartClose')
    this.setState({isDeleteLegoPart: false})
  }

  async handleDeleteLegoPartSave() {
    // let legoParts = await fetchAllLegoPartsFromAPI()
    this.setState({isDeleteLegoPart: false})
    this.props.handleDeleteLegoPartSave()
  }

  render() {
    console.log('LegoPartsTable call render '+this.state.legoParts.length)
    console.log('LegoPartsTable call isDeleteLegoPart '+this.state.isDeleteLegoPart)
    let deleteLegoPartModal
    if (this.state.isDeleteLegoPart) {
      deleteLegoPartModal = <LegoPartDeleteModal
        legoPartToDelete={this.state.legoPartToDelete}
        isDeleteLegoPart={this.state.isDeleteLegoPart}
        handleDeleteLegoPartClose={this.handleDeleteLegoPartClose}
        handleDeleteLegoPartSave={this.handleDeleteLegoPartSave}
      />
    }
    return(
      <>
      <Table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>
                <Form.Check onClick={event => this.selectAllLegoPartsOnClick(event)}>
                </Form.Check>
            </th>
            <th>Name</th>
            <th>Description</th>
            <th>Part Number</th>
            <th>Quantity</th>
            <th>Color</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.legoParts.map(legoPart =>(
            <tr key={legoPart.id}>
              <td><Form.Check onClick={event => this.selectLegoPartOnClick(event)}>
                </Form.Check></td>
              <td>{legoPart.name}</td>
              <td>{legoPart.description}</td>
              <td>{legoPart.part_number}</td>
              <td>{legoPart.quantity}</td>
              <td>{legoPart.color}</td>
              <td>{legoPart.image}</td>
              <td>
                <Button variant='warning' size='sm' onClick={() => this.editLegoPart()}>Edit</Button>
                <Button variant='danger' size='sm' onClick={() => this.deleteLegoPart(legoPart)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {deleteLegoPartModal}
      </>
    )
  }
}

export async function fetchAllLegoPartsFromAPI() {
  let service = new Service()
  let utilities = new Utilities()
  try {
    let legoParts = await service.getAllLegoPartsFromAPI()
    utilities.sortLegoPartNumbers(legoParts)
    console.log('fetchAllLegoPartsFromAPI success '+legoParts.length)
    return legoParts
  } catch (error) {
    console.log('fetchAllLegoPartsFromAPI error')
    return error
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<LegoPartsCRUD />);