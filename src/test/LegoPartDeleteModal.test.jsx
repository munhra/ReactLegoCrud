import React from 'react';
import { render, screen } from '@testing-library/react'
import { LegoPartDeleteModal } from '../legoPartDeleteModal'
import { MockService} from './MockService'
import userEvent from '@testing-library/user-event'

const mockLegoPartToDelete = {
  id: '1',
  name: 'Mock Lego Part Name',
  description: 'Mock Lego Part Description',
  part_number: '1234567',
  quantity: 10,
  color: 'blue',
  image: 'part.jpg'
}

it('LegoPartDeleteModal renders successfully', () => {
  render(<LegoPartDeleteModal service = {new MockService()}
                              isDeleteLegoPart={true} 
                              legoPartToDelete = {mockLegoPartToDelete}/>)

  const titleText = screen.getByText(/Delete Lego Part/)
  const subTitleText = screen.getByText(/Are you sure to delete lego part "Mock Lego Part Name"/)
  expect(titleText).toBeInTheDocument()
  expect(subTitleText).toBeInTheDocument()
})

it('LegoPartDeleteModal cancel', async () => {
  let isHandleDeleteLegoPartCloseCalled = false
  const mockHandleDeleteLegoPartClose = function handleDeleteLegoPartClose () {
    isHandleDeleteLegoPartCloseCalled = true
  }
  const user = userEvent.setup()

  render(<LegoPartDeleteModal service = {new MockService()}
                              handleDeleteLegoPartClose={mockHandleDeleteLegoPartClose}
                              isDeleteLegoPart={true}
                              legoPartToDelete = {mockLegoPartToDelete}/>)

  const cancelButton = screen.getByText('Cancel')
  expect(cancelButton).toBeInTheDocument()
  await user.click(cancelButton)
  expect(isHandleDeleteLegoPartCloseCalled).toEqual(true)
})

it('LegoPartDeleteModal delete with success', async () => {
  const user = userEvent.setup()
  const mockedService = new MockService()

  render(<LegoPartDeleteModal service = {mockedService}
                              isDeleteLegoPart={true}
                              legoPartToDelete = {mockLegoPartToDelete}/>)

  const deleteButton = screen.getByText('Delete')
  expect(deleteButton).toBeInTheDocument()
  await user.click(deleteButton)
  expect(await mockedService.isDeleteLegoPartFromAPISuccess).toEqual(true)
})

it('LegoPartDeleteModal delete with error', async () => {
  const user = userEvent.setup()
  const mockedService = new MockService()
  mockedService.isDeleteLegoPartFromAPIError = true

  render(<LegoPartDeleteModal service = {mockedService}
                              isDeleteLegoPart={true}
                              legoPartToDelete = {mockLegoPartToDelete}/>)

  const deleteButton = screen.getByText('Delete')
  expect(deleteButton).toBeInTheDocument()
  await user.click(deleteButton)
  // Error when deleting lego part.
  const errorMessage = screen.getByText('Error when deleting lego part.')
  // expect(await mockedService.isDeleteLegoPartFromAPISuccess).toEqual(true)
  expect(errorMessage).toBeInTheDocument()
})