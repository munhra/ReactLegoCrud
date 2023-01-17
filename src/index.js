import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Navbar, Table } from 'react-bootstrap';
import { Service } from './service';
import { Utilities } from './utilities';
import './index.css';

class LegoPartsCRUD extends React.Component {
  render() {
    return (
      <>
        <LegoPartsNavbar />
        <LegoPartsTable />
      </>
    )
  }
}

class LegoPartsNavbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isAddLegoPart: false, isDeleteLegoParts: false}

    // With the bind() method, an object can borrow a method from another object.
    this.handleAddLegoPartClose = this.handleAddLegoPartClose.bind(this)
    this.handleAddLegoPartSave = this.handleAddLegoPartSave.bind(this)

    this.handleDeleteLegoPartClose = this.handleDeleteLegoPartClose.bind(this)
    this.handleDeleteLegoPartSave = this.handleDeleteLegoPartSave.bind(this)
  }

  deleteLegoParts() {
    console.log('Delete lego part !!')
    this.setState({isDeleteLegoParts: true})
  }

  addLegoPart() {
    console.log('Add lego part !!')
    this.setState({isAddLegoPart: true})
  }

  handleAddLegoPartClose() {
    console.log('handleAddLegoPartClose')
    this.setState({isAddLegoPart: false, isDeleteLegoParts: false})
  }

  handleAddLegoPartSave() {
    console.log('handleAddLegoPartSave')
    this.setState({isAddLegoPart: false, isDeleteLegoParts: false})
  }

  handleDeleteLegoPartClose() {
    console.log('handleDeleteLegoPartClose')
    this.setState({isAddLegoPart: false, isDeleteLegoParts: false})
  }

  handleDeleteLegoPartSave() {
    console.log('handleDeleteLegoPartSave')
    this.setState({isAddLegoPart: false, isDeleteLegoParts: false})
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
      </>
    )
  }
}

class LegoPartDeleteModal extends React.Component {

  componentDidMount() {
    console.log('LegoPartDeleteModal componentDidMount !!!')
  }

  componentWillUnmount() {
    console.log('LegoPartDeleteModal componentWillUnmount !!!')
  }

  handleClose() {
    this.props.handleDeleteLegoPartClose()
  }

  handleDelete() {
    console.log('##### handleDelete LegoPartDeleteModal ######')
    this.props.handleDeleteLegoPartSave()
  }

  render() {
    return (
      <Modal show={this.props.isDeleteLegoPart}>
        <Modal.Title>Delete Lego Part</Modal.Title>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => this.handleClose()}>Cancel</Button>
          <Button variant='primary' onClick={() => this.handleDelete()}>Delete</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

class LegoPartsCreateOrEditModal extends React.Component {
  handleClose() {
    this.props.handleAddLegoPartClose()
  }

  handleSave() {
    this.props.handleAddLegoPartSave()
  }

  render() {
    return (
      <Modal show={this.props.isAddLegoPart}>
        <Modal.Title>Add Lego Part</Modal.Title>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => this.handleClose()}>Cancel</Button>
          <Button variant='primary' onClick={() => this.handleSave()}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

class LegoPartsTable extends React.Component {
  constructor() {
    super()
    this.state = {legoParts: []}
    this.service = new Service()
    this.utilities = new Utilities()
  }

  async componentDidMount() {
    try {
      let legoParts = await this.service.getAllLegoPartsFromAPI()
      this.utilities.sortLegoPartNumbers(legoParts)
      this.setState({legoParts: legoParts})
    } catch (error) {
      // error dialog
    }
  }

  editLegoPart() {
    console.log('Edit lego part !!')
  }

  deleteLegoPart() {
    console.log('Delete lego part !!')
  }

  selectLegoPartOnClick(event) {
    console.log('Select lego part on click !! '+event.target.checked)
  }
  
  selectAllLegoPartsOnClick(event) {
    console.log('Select all lego parts on click !! '+event.target.checked)
  }

  render() {
    return(
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
                <Button variant='danger' size='sm' onClick={() => this.deleteLegoPart()}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<LegoPartsCRUD />);