import React from 'react';
import { render, screen } from '@testing-library/react';
import { LegoPartsCreateOrEditModal } from '../legoPartsCreateOrEditModal'
import { MockService } from './MockService'
import userEvent from '@testing-library/user-event'

it('legoPartsCreateOrEditModal add mode renders successfully', async () => {
  const user = userEvent.setup()
  const mockLegoPart = MockService.mockLegoPart
  render(<LegoPartsCreateOrEditModal showLegoPartForm = {true}
                                     isEditMode = {false}/>)

  const titleText = screen.getByText(/Add Lego Part/)

  const nameLabel = screen.getByText(/Name/)
  const nameInput = screen.getByTestId(/inputName/)

  const descriptionLabel = screen.getByText(/Description/)
  const descriptionInput = screen.getByTestId(/inputDescription/)

  const partNumberLabel = screen.getByText(/Part Number/)
  const partNumberInput = screen.getByTestId(/inputPart_number/)

  const quantityLabel = screen.getByText(/Quantity/)
  const quantityInput = screen.getByTestId(/inputQuantity/)

  const colorLabel = screen.getByText(/Color/)
  const colorInput = screen.getByTestId(/inputColor/)

  const imageLabel = screen.getByText(/Image/)
  const imageInput = screen.getByTestId(/inputImage/)

  expect(titleText).toBeInTheDocument()
  
  expect(nameLabel).toBeInTheDocument()
  expect(nameInput).toBeInTheDocument()
  expect(descriptionLabel).toBeInTheDocument()
  expect(descriptionInput).toBeInTheDocument()
  expect(partNumberLabel).toBeInTheDocument()
  expect(partNumberInput).toBeInTheDocument()
  expect(quantityLabel).toBeInTheDocument()
  expect(quantityInput).toBeInTheDocument()
  expect(colorLabel).toBeInTheDocument()
  expect(colorInput).toBeInTheDocument()
  expect(imageLabel).toBeInTheDocument()
  expect(imageInput).toBeInTheDocument()

  await user.click(nameInput)
  await user.keyboard(mockLegoPart.name)
  expect(nameInput).toHaveValue(mockLegoPart.name)

  await user.click(descriptionInput)
  await user.keyboard(mockLegoPart.description)
  expect(descriptionInput).toHaveValue(mockLegoPart.description)

  await user.click(partNumberInput)
  await user.keyboard(mockLegoPart.part_number)
  expect(partNumberInput).toHaveValue(mockLegoPart.part_number)

  await user.click(quantityInput)
  await user.keyboard(mockLegoPart.quantity)

  // check why 0 is required here
  expect(quantityInput).toHaveValue('0' + mockLegoPart.quantity)

  await user.click(colorInput)
  await user.keyboard(mockLegoPart.color)
  expect(colorInput).toHaveValue(mockLegoPart.color)

  await user.click(imageInput)
  await user.keyboard(mockLegoPart.image)
  expect(imageInput).toHaveValue(mockLegoPart.image)
})

it('legoPartsCreateOrEditModal edit mode renders successfully', () => {
  render(<LegoPartsCreateOrEditModal service = {new MockService()}
                                     showLegoPartForm = {true}
                                     legoPartToEdit = {MockService.mockLegoPart}
                                     isEditMode = {true}/>)
  const inputName = screen.getByTestId(/inputName/)
  const titleText = screen.getByText(/Edit Lego Part/)
  const nameLabel = screen.getByText(/Name/)
  // include an expect to check the contents of the field
  // const nameField = screen.getByText(/Mock Lego Part Name/)
  
  expect(titleText).toBeInTheDocument()
  expect(nameLabel).toBeInTheDocument()
  expect(inputName).toHaveValue("Mock Lego Part Name")
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

it('legoPartsCreateOrEditModal edit part with error', async () => {
  const user = userEvent.setup()
  const mockedService = new MockService()
  mockedService.isUpdateLegoPartFromAPIError = true
  
  render(<LegoPartsCreateOrEditModal service = {mockedService}
                                     legoPartToEdit = {MockService.mockLegoPart}
                                     showLegoPartForm = {true}
                                     isEditMode = {true}/>)

  const saveChangesButton = screen.getByText('Save changes')
  expect(saveChangesButton).toBeInTheDocument()
  await user.click(saveChangesButton)
  
  const errorMessage = screen.getByText('Error when editing lego part.')
  expect(errorMessage).toBeInTheDocument()
})

it('legoPartsCreateOrEditModal cancel add part', async () => {
  const user = userEvent.setup()
  const mockedService = new MockService()
  let isHandleCancelAddLegoPart = false

  const mockHandleCancelAddLegoPart = function handleCancelAddLegoPart () {
    isHandleCancelAddLegoPart = true
  }

  render(<LegoPartsCreateOrEditModal service = {mockedService}
                                     handleAddLegoPartClose = {mockHandleCancelAddLegoPart}
                                     showLegoPartForm = {true}
                                     isEditMode = {false}/>)

  const cancelButton = screen.getByText('Cancel')
  expect(cancelButton).toBeInTheDocument()
  await user.click(cancelButton)
  expect(isHandleCancelAddLegoPart).toEqual(true)
})
