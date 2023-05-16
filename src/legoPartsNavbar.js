import { Toast, Button, Modal, Form, Navbar, Table, Spinner, ToastContainer } from 'react-bootstrap';
import React from 'react';
import { Service } from './service';
import { LegoPartsCreateOrEditModal } from './legoPartsCreateOrEditModal'
import { LegoPartDeleteModal } from './legoPartDeleteModal';
import { LegoPartsTable } from './legoPartsTable'
import { Utilities } from './utilities';

export class LegoPartsNavbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isAddLegoPart: false, isDeleteLegoParts: false}

    this.handleAddLegoPartClose = this.handleAddLegoPartClose.bind(this)
    this.handleAddLegoPartSave = this.handleAddLegoPartSave.bind(this)

    this.handleDeleteLegoPartClose = this.handleDeleteLegoPartClose.bind(this)
    this.handleDeleteLegoPartSave = this.handleDeleteLegoPartSave.bind(this)

    this.handleEditLegoPartSave = this.handleEditLegoPartSave.bind(this)
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

  // maybe both methods handleAddLegoPartSave and handleEditLegoPartSave can be merged in one method called
  // updateLegoTable

  async handleAddLegoPartSave() {
    let legoParts = await fetchAllLegoPartsFromAPI()
    // implement error handling for this
    this.setState({isAddLegoPart: false, legoParts: legoParts})
  }

  async handleEditLegoPartSave() {
    let legoParts = await fetchAllLegoPartsFromAPI()
    // implement error handling for this
    // i think that isAddLegoPart is not required
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
      showLegoPartForm = {this.state.isAddLegoPart} 
        handleAddLegoPartClose = {this.handleAddLegoPartClose}
        handleAddLegoPartSave = {this.handleAddLegoPartSave}
        isEditMode = {false}
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
      <LegoPartsTable legoParts = {this.state.legoParts} 
                      handleDeleteLegoPartSave = {this.handleDeleteLegoPartSave} 
                      handleEditLegoPartSave = {this.handleEditLegoPartSave}
        />
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