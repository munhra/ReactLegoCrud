import { Toast, Button, Modal, Form, Navbar, Table, Spinner, ToastContainer } from 'react-bootstrap';
import { LegoPartDeleteModal } from './legoPartDeleteModal';
import { LegoPartsCreateOrEditModal } from './legoPartsCreateOrEditModal';
import React from 'react';
import { Service } from './service';
import { Utilities } from './utilities';

export class LegoPartsTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {legoParts: [], legoPartToDelete: {}}
    this.utilities = new Utilities()

    this.handleDeleteLegoPartClose = this.handleDeleteLegoPartClose.bind(this)
    this.handleDeleteLegoPartSave = this.handleDeleteLegoPartSave.bind(this)

    // I dont know if handleEditLegoPartClose is necessary
    this.handleEditLegoPartClose = this.handleEditLegoPartClose.bind(this)
    this.handleEditLegoPartSave = this.handleEditLegoPartSave.bind(this)
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

  editLegoPart(legoPart) {
    console.log('Edit lego part !! '+legoPart.name)
    this.setState({isEditLegoPart: true, legoPartToEdit: legoPart})
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
    this.setState({isDeleteLegoPart: false})
    this.props.handleDeleteLegoPartSave()
  }

  handleEditLegoPartClose() {
    this.setState({isEditLegoPart: false})
  }

  handleEditLegoPartSave() {
    this.setState({isEditLegoPart: false})
    this.props.handleEditLegoPartSave()
  }

  render() {
    let deleteLegoPartModal
    let editLegoPartModal

    if (this.state.isDeleteLegoPart) {
      deleteLegoPartModal = <LegoPartDeleteModal
        service = {new Service()}
        legoPartToDelete = {this.state.legoPartToDelete}
        isDeleteLegoPart = {this.state.isDeleteLegoPart}
        handleDeleteLegoPartClose = {this.handleDeleteLegoPartClose}
        handleDeleteLegoPartSave = {this.handleDeleteLegoPartSave}
      />
    }
    if (this.state.isEditLegoPart) {
      editLegoPartModal = <LegoPartsCreateOrEditModal
        service = {new Service()}
        showLegoPartForm = {this.state.isEditLegoPart}
        handleAddLegoPartClose = {this.handleEditLegoPartClose}
        handleAddLegoPartSave = {this.handleEditLegoPartSave}
        isEditMode = {true}
        legoPartToEdit = {this.state.legoPartToEdit}
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
                <Button variant='warning' size='sm' onClick={() => this.editLegoPart(legoPart)}>Edit</Button>
                <Button variant='danger' size='sm' onClick={() => this.deleteLegoPart(legoPart)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {deleteLegoPartModal}
      {editLegoPartModal}
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