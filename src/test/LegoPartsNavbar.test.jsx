/* global expect it */
import React from 'react'
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { LegoPartsNavbar } from '../legoPartsNavbar'
import { MockService } from './MockService'
import userEvent from '@testing-library/user-event'
import { Utilities } from '../utilities'

it('LegoPartsNavbar renders successfully.', () => {
  render(<LegoPartsNavbar />)
  const titleText = screen.getByText('Lego Part CRUD')
  expect(titleText).toBeInTheDocument()
})

it('Add lego part open modal successfully and cancel.', async () => {
  const user = userEvent.setup()
  const mockedService = new MockService()
  render(<LegoPartsNavbar service = {mockedService} />)
  const addNewLegoPartButton = screen.getByText('Add New Lego Part')
  expect(addNewLegoPartButton).toBeInTheDocument()

  await user.click(addNewLegoPartButton)
  const titleText = screen.getByText('Add Lego Part')
  expect(titleText).toBeInTheDocument()

  const cancelAddNewLegoPart = screen.getByText('Cancel')
  expect(cancelAddNewLegoPart).toBeInTheDocument()
  await user.click(cancelAddNewLegoPart)
})

it('Add lego part open modal successfully and save.', async () => {
  const user = userEvent.setup()
  const mockedService = new MockService()
  render(<LegoPartsNavbar service = {mockedService} />)
  const addNewLegoPartButton = screen.getByText('Add New Lego Part')
  expect(addNewLegoPartButton).toBeInTheDocument()

  await user.click(addNewLegoPartButton)
  const titleText = screen.getByText('Add Lego Part')
  expect(titleText).toBeInTheDocument()

  const saveAddNewLegoPart = screen.getByText('Save changes')
  expect(saveAddNewLegoPart).toBeInTheDocument()
  await user.click(saveAddNewLegoPart)

  const infoToastMessage = screen.getByText('Lego part created with success.')
  await waitForElementToBeRemoved(infoToastMessage, { timeout: 3000 })
})

it('Delete lego part open modal successfully and cancel', async () => {
  const mockedService = new MockService()
  Utilities.service = mockedService
  const user = userEvent.setup()

  render(<LegoPartsNavbar service = {mockedService} />)

  const checkBox = screen.getByTestId('selectAllCheck')
  expect(checkBox).toBeInTheDocument()
  await user.click(checkBox)

  const deleteSelectedLegoParts = screen.getByTestId('navBarDeleteButton')
  expect(deleteSelectedLegoParts).toBeInTheDocument()
  await user.click(deleteSelectedLegoParts)

  const titleText = screen.getByText('Delete Selected Lego Part(s)')
  expect(titleText).toBeInTheDocument()

  const cancelDeleteSelectedLegoParts = screen.getByText('Cancel')
  expect(cancelDeleteSelectedLegoParts).toBeInTheDocument()
  await user.click(cancelDeleteSelectedLegoParts)
})

it('Delete lego part open modal successfully and save', async () => {
  const mockedService = new MockService()
  Utilities.service = mockedService
  const user = userEvent.setup()

  render(<LegoPartsNavbar service = {mockedService} />)

  const checkBox = screen.getByTestId('selectAllCheck')
  expect(checkBox).toBeInTheDocument()
  // check the select all box
  await user.click(checkBox)
  // uncheck the select all box
  await user.click(checkBox)
  // verify if nav bar button is disabled
  await user.click(checkBox)

  const legoPartName = screen.getByText('Selected Mock Lego Part Name')
  expect(legoPartName).toBeInTheDocument()

  const deleteSelectedLegoParts = screen.getByTestId('navBarDeleteButton')
  expect(deleteSelectedLegoParts).toBeInTheDocument()
  await user.click(deleteSelectedLegoParts)

  const titleText = screen.getByText('Delete Selected Lego Part(s)')
  expect(titleText).toBeInTheDocument()

  const saveDeleteSelectedLegoParts = screen.getByTestId('selectedPartDeleteButton')
  expect(saveDeleteSelectedLegoParts).toBeInTheDocument()
  await user.click(saveDeleteSelectedLegoParts)

  const infoToastMessage = screen.getByText('Selected lego parts deleted with success.')
  await waitForElementToBeRemoved(infoToastMessage, { timeout: 3000 })
})

it('Edit lego part open modal successfully and save', async () => {
  const mockedService = new MockService()
  Utilities.service = mockedService
  const user = userEvent.setup()

  render(<LegoPartsNavbar service = {mockedService} />)

  const checkBox = screen.getByTestId('selectAllCheck')
  await user.click(checkBox)

  const legoPartName = screen.getByText('Selected Mock Lego Part Name')
  expect(legoPartName).toBeInTheDocument()

  const legoPartEditButton = screen.getByText('Edit')
  await waitFor(() => expect(legoPartEditButton).toBeInTheDocument(), { timeout: 3000 })
  await user.click(legoPartEditButton)

  const titleText = screen.getByText('Edit Lego Part')
  expect(titleText).toBeInTheDocument()

  const saveEditLegoPart = screen.getByText('Save changes')
  expect(saveEditLegoPart).toBeInTheDocument()
  await user.click(saveEditLegoPart)

  const infoToastMessage = screen.getByText('Lego part edited with success.')
  await waitForElementToBeRemoved(infoToastMessage, { timeout: 3000 })
})

// fix delete button multiplicity
it('Delete lego part open modal successfully and delete', async () => {
  const mockedService = new MockService()
  Utilities.service = mockedService
  const user = userEvent.setup()

  render(<LegoPartsNavbar service = {mockedService} />)

  const checkBox = screen.getByTestId('selectAllCheck')
  await user.click(checkBox)

  const legoPartName = screen.getByText('Selected Mock Lego Part Name')
  expect(legoPartName).toBeInTheDocument()

  const legoPartDeleteButton = screen.getByTestId('itemDelete_2')
  await waitFor(() => expect(legoPartDeleteButton).toBeInTheDocument(), { timeout: 3000 })
  await user.click(legoPartDeleteButton)

  const titleText = screen.getByText('Delete Lego Part')
  expect(titleText).toBeInTheDocument()

  const saveDeleteLegoPart = screen.getByTestId('deleteModalButton')
  expect(saveDeleteLegoPart).toBeInTheDocument()
  await user.click(saveDeleteLegoPart)

  const infoToastMessage = screen.getByText('Lego part deleted with success.')
  await waitForElementToBeRemoved(infoToastMessage, { timeout: 3000 })
})
