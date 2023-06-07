import React from 'react';
import { render, screen } from '@testing-library/react';
import { LegoPartsCreateOrEditModal } from '../legoPartsCreateOrEditModal'
import { MockService } from './MockService'
import userEvent from '@testing-library/user-event'

it('legoPartsCreateOrEditModal add mode renders successfully', () => {
  render(<LegoPartsCreateOrEditModal showLegoPartForm = {true}
                                     isEditMode = {false}/>)

  const titleText = screen.getByText(/Add Lego Part/)
  expect(titleText).toBeInTheDocument()
})

it('legoPartsCreateOrEditModal edit mode renders successfully', () => {
  render(<LegoPartsCreateOrEditModal service = {new MockService()}
                                     showLegoPartForm = {true}
                                     legoPartToEdit = {MockService.mockLegoPart}
                                     isEditMode = {true}/>)

  const titleText = screen.getByText(/Add Lego Part/)
  const nameLabel = screen.getByText(/Name/)
  // include an expect to check the contents of the field
  // const nameField = screen.getByText(/Mock Lego Part Name/)
  expect(titleText).toBeInTheDocument()
  expect(nameLabel).toBeInTheDocument()
})

it('legoPartsCreateOrEditModal add part with success', async () => {
  const user = userEvent.setup()
  const mockedService = new MockService()

  render(<LegoPartsCreateOrEditModal service = {mockedService}
                                     showLegoPartForm = {true}
                                     isEditMode = {false}/>)

  const saveChangesButton = screen.getByText('Save changes')
  expect(saveChangesButton).toBeInTheDocument()
  await user.click(saveChangesButton)
  expect(await mockedService.isCreateLegoPartFromAPISuccess).toEqual(true)
})

it('legoPartsCreateOrEditModal add part with error', async () => {
  const user = userEvent.setup()
  const mockedService = new MockService()
  mockedService.isCreateLegoPartFromAPIError = true
  render(<LegoPartsCreateOrEditModal service = {mockedService}
                                     showLegoPartForm = {true}
                                     isEditMode = {false}/>)

  const saveChangesButton = screen.getByText('Save changes')
  expect(saveChangesButton).toBeInTheDocument()
  await user.click(saveChangesButton)
  const errorMessage = screen.getByText('Error when creating lego part.')
  expect(errorMessage).toBeInTheDocument()
})

it('legoPartsCreateOrEditModal edit part with success', async () => {
  const user = userEvent.setup()
  const mockedService = new MockService()

  render(<LegoPartsCreateOrEditModal service = {mockedService}
                                     legoPartToEdit = {MockService.mockLegoPart}
                                     showLegoPartForm = {true}
                                     isEditMode = {true}/>)

  const saveChangesButton = screen.getByText('Save changes')
  expect(saveChangesButton).toBeInTheDocument()
  await user.click(saveChangesButton)
  expect(await mockedService.isUpdateLegoPartFromAPISuccess).toEqual(true)
})
