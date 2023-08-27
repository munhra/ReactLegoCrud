import { Button, Form, Table } from 'react-bootstrap'
import { LegoPartDeleteModal } from './legoPartDeleteModal'
import { LegoPartsCreateOrEditModal } from './legoPartsCreateOrEditModal'
import React from 'react'
import { Utilities } from './utilities'
import PropTypes from 'prop-types'

export class LegoPartsTable extends React.Component {
  constructor (props) {
    super(props)
    this.service = props.service
    this.state = { legoParts: [], legoPartToDelete: {}, selectedLegoParts: [], selectAllLegoParts: false }
    this.utilities = new Utilities()

    this.handleDeleteLegoPartClose = this.handleDeleteLegoPartClose.bind(this)
    this.handleDeleteLegoPartSave = this.handleDeleteLegoPartSave.bind(this)

    // I don't know if handleEditLegoPartClose is necessary
    this.handleEditLegoPartClose = this.handleEditLegoPartClose.bind(this)
    this.handleEditLegoPartSave = this.handleEditLegoPartSave.bind(this)
  }

  async componentDidMount () {
    const legoParts = await this.utilities.fetchAllLegoPartsFromAPI()
    // error handling needs to be implemented
    this.setState({ legoParts })
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.legoParts === undefined) {
      return null
    }
    return {
      legoParts: nextProps.legoParts
    }
  }

  editLegoPart (legoPart) {
    this.setState({ isEditLegoPart: true, legoPartToEdit: legoPart })
  }

  deleteLegoPart (legoPart) {
    this.setState({ isDeleteLegoPart: true, legoPartToDelete: legoPart })
  }

  selectLegoPartOnClick (event) {
    const legoPartId = event.target.id
    if (event.target.checked) {
      const selectedLegoPart = this.utilities.getLegoPartByID(legoPartId, this.state.legoParts)
      this.state.selectedLegoParts.push(selectedLegoPart)
    } else {
      this.utilities.removeSelectedLegoPart(legoPartId, this.state.selectedLegoParts)
    }
    this.props.updateSelectedLegoParts(this.state.selectedLegoParts)
    this.isSelectedLegoPart(event.target.id)
  }

  isSelectedLegoPart (legoPartId) {
    // I think that it can be reduce to a one line logic
    const filteredLegoPart = this.state.selectedLegoParts.filter(legoPart => legoPart.id === legoPartId)
    if (filteredLegoPart[0]) {
      return true
    } else {
      return false
    }
  }

  selectAllLegoPartsOnClick (event) {
    // maybe it is possible to simplify it to one line
    if (event.target.checked) {
      const selectAllLegoParts = this.utilities.cloneLegoParts(this.state.legoParts)
      this.setState({ selectedLegoParts: selectAllLegoParts })
      this.props.updateSelectedLegoParts(selectAllLegoParts)
    } else {
      this.setState({ selectedLegoParts: [] })
      this.props.updateSelectedLegoParts([])
    }
  }

  handleDeleteLegoPartClose () {
    this.setState({ isDeleteLegoPart: false })
  }

  async handleDeleteLegoPartSave () {
    this.setState({ isDeleteLegoPart: false })
    this.props.handleDeleteLegoPartSave()
  }

  handleEditLegoPartClose () {
    this.setState({ isEditLegoPart: false })
  }

  handleEditLegoPartSave () {
    this.setState({ isEditLegoPart: false })
    this.props.handleEditLegoPartSave()
  }

  render () {
    let deleteLegoPartModal
    let editLegoPartModal

    if (this.state.isDeleteLegoPart) {
      deleteLegoPartModal = <LegoPartDeleteModal
        service = {this.service}
        legoPartToDelete = {this.state.legoPartToDelete}
        isDeleteLegoPart = {this.state.isDeleteLegoPart}
        handleDeleteLegoPartClose = {this.handleDeleteLegoPartClose}
        handleDeleteLegoPartSave = {this.handleDeleteLegoPartSave}
      />
    }
    if (this.state.isEditLegoPart) {
      editLegoPartModal = <LegoPartsCreateOrEditModal
        service = {this.service}
        showLegoPartForm = {this.state.isEditLegoPart}
        handleAddLegoPartClose = {this.handleEditLegoPartClose}
        handleAddLegoPartSave = {this.handleEditLegoPartSave}
        isEditMode = {true}
        legoPartToEdit = {this.state.legoPartToEdit}
      />
    }
    return (
      <>
      <Table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>
                <Form.Check data-testid='selectAllCheck' onClick={event => this.selectAllLegoPartsOnClick(event)}>
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
          {this.state.legoParts.map(legoPart => (
            <tr key={legoPart.id}>
              <td><Form.Check data-testid={'itemCheck_' + legoPart.id} checked={this.isSelectedLegoPart(legoPart.id)} id={legoPart.id} onChange={event => this.selectLegoPartOnClick(event)}></Form.Check></td>
              <td>{legoPart.name}</td>
              <td>{legoPart.description}</td>
              <td>{legoPart.part_number}</td>
              <td>{legoPart.quantity}</td>
              <td>{legoPart.color}</td>
              <td>{legoPart.image}</td>
              <td>
                <Button variant='warning' size='sm' onClick={() => this.editLegoPart(legoPart)}>Edit</Button>
                <Button data-testid={'itemDelete_' + legoPart.id} variant='danger' size='sm' onClick={() => this.deleteLegoPart(legoPart)}>Delete</Button>
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

LegoPartsTable.propTypes = {
  legoParts: PropTypes.array,
  handleDeleteLegoPartSave: PropTypes.func,
  handleEditLegoPartSave: PropTypes.func,
  service: PropTypes.object,
  updateSelectedLegoParts: PropTypes.func
}
