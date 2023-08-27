import { Button, Navbar } from 'react-bootstrap'
import React from 'react'
import { LegoPartsCreateOrEditModal } from './legoPartsCreateOrEditModal'
import { LegoPartDeleteSelectedModal } from './legoPartDeleteSelectedModal'
import { LegoPartsTable } from './legoPartsTable'
import PropTypes from 'prop-types'
import { Utilities } from './utilities'

export class LegoPartsNavbar extends React.Component {
  constructor (props) {
    super(props)
    this.service = props.service
    this.state = { isAddLegoPart: false, isDeleteSelectedLegoParts: false, isDeleteButtonDisabled: true, selectedLegoParts: [] }

    this.handleAddLegoPartClose = this.handleAddLegoPartClose.bind(this)
    this.handleAddLegoPartSave = this.handleAddLegoPartSave.bind(this)

    this.handleDeleteSelectedLegoPartsClose = this.handleDeleteSelectedLegoPartsClose.bind(this)
    this.handleDeleteSelectedLegoPartsSave = this.handleDeleteSelectedLegoPartsSave.bind(this)

    this.handleEditLegoPartSave = this.handleEditLegoPartSave.bind(this)
    this.updateSelectedLegoParts = this.updateSelectedLegoParts.bind(this)
    this.utilities = new Utilities()
  }

  deleteSelectedLegoParts () {
    this.setState({ isDeleteSelectedLegoParts: true })
  }

  addLegoPart () {
    this.setState({ isAddLegoPart: true })
  }

  handleAddLegoPartClose () {
    this.setState({ isAddLegoPart: false })
  }

  updateSelectedLegoParts (selectedLegoParts) {
    // check what happen if no records are found
    this.setState({ isDeleteButtonDisabled: selectedLegoParts.length === 0, selectedLegoParts })
  }

  // maybe both methods handleAddLegoPartSave and handleEditLegoPartSave can be merged in one method called
  // updateLegoTable

  async handleAddLegoPartSave () {
    const legoParts = await this.utilities.fetchAllLegoPartsFromAPI()
    // implement error handling for this
    this.setState({ isAddLegoPart: false, legoParts })
  }

  async handleEditLegoPartSave () {
    const legoParts = await this.utilities.fetchAllLegoPartsFromAPI()
    // implement error handling for this
    // i think that isAddLegoPart is not required
    this.setState({ isAddLegoPart: false, legoParts })
  }

  handleDeleteSelectedLegoPartsClose () {
    this.setState({ isDeleteSelectedLegoParts: false })
  }

  async handleDeleteSelectedLegoPartsSave () {
    const legoParts = await this.utilities.fetchAllLegoPartsFromAPI()
    this.setState({ isAddLegoPart: false, isDeleteSelectedLegoParts: false, legoParts })
  }

  render () {
    let addLegoPartModal
    let legoPartDeleteSelectedModal

    if (this.state.isAddLegoPart) {
      addLegoPartModal = <LegoPartsCreateOrEditModal service = {this.service}
                                                     showLegoPartForm = {this.state.isAddLegoPart}
                                                     handleAddLegoPartClose = {this.handleAddLegoPartClose}
                                                     handleAddLegoPartSave = {this.handleAddLegoPartSave}
                                                     isEditMode = {false}
      />
    }

    if (this.state.isDeleteSelectedLegoParts) {
      legoPartDeleteSelectedModal = <LegoPartDeleteSelectedModal service = {this.service}
                                                                 selectedLegoParts = {this.state.selectedLegoParts}
                                                                 isDeleteSelectedLegoParts={this.state.isDeleteSelectedLegoParts}
                                                                 handleDeleteSelectedLegoPartsClose={this.handleDeleteSelectedLegoPartsClose}
                                                                 handleDeleteSelectedLegoPartsSave={this.handleDeleteSelectedLegoPartsSave}
      />
    }

    return (
      <>
      <Navbar className='navbar navbar-expand-lg bg-light'>
        <div className='container-fluid'>
          <p className='navbar-brand'>Lego Part CRUD</p>
          <Button className='navbar-toggler' type='button'>
          </Button>
          <div className='collapse navbar-collapse'>
            <div className='d-flex'>
              <Button data-testid='navBarDeleteButton' disabled={this.state.isDeleteButtonDisabled} className='btn btn-danger ms-1' type='button' onClick={() => this.deleteSelectedLegoParts()}>Delete</Button>
              <Button className='btn btn-success ms-1' type='button' onClick={() => this.addLegoPart()}>Add New Lego Part</Button>
            </div>
          </div>
        </div>
      </Navbar>
      {addLegoPartModal}
      {legoPartDeleteSelectedModal}
      <LegoPartsTable legoParts = {this.state.legoParts}
                      service = {this.service}
                      handleDeleteLegoPartSave = {this.handleDeleteSelectedLegoPartsSave}
                      handleEditLegoPartSave = {this.handleEditLegoPartSave}
                      updateSelectedLegoParts = {this.updateSelectedLegoParts}
        />
      </>
    )
  }
}

LegoPartsNavbar.propTypes = {
  service: PropTypes.object
}
