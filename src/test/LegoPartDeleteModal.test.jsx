/* global expect it */
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { LegoPartDeleteModal } from '../legoPartDeleteModal'
import { MockService } from './MockService'
import userEvent from '@testing-library/user-event'

it('LegoPartDeleteModal renders successfully', () => {
  render(<LegoPartDeleteModal service = {new MockService()}
                              isDeleteLegoPart={true}
                              legoPartToDelete = {MockService.mockLegoPart}/>)

  const titleText = screen.getByText(/Delete Lego Part/)
  const subTitleText = screen.getByText(/Are you sure to delete lego part with name: Mock Lego Part Name/)
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
                              legoPartToDelete = {MockService.mockLegoPart}/>)

  const cancelButton = screen.getByText('Cancel')
  expect(cancelButton).toBeInTheDocument()
  await user.click(cancelButton)
  expect(isHandleDeleteLegoPartCloseCalled).toEqual(true)
})

it('LegoPartDeleteModal delete with success', async () => {
  const user = userEvent.setup()
  const mockedService = new MockService()

  let ishandleDeleteLegoPartSaveCalled = false
  const mockHandleDeleteLegoPartSave = function handleDeleteLegoPartSave () {
    ishandleDeleteLegoPartSaveCalled = true
  }

  render(<LegoPartDeleteModal service = {mockedService}
                              isDeleteLegoPart={true}
                              handleDeleteLegoPartSave = {mockHandleDeleteLegoPartSave}
                              legoPartToDelete = {MockService.mockLegoPart}/>)

  const deleteButton = screen.getByText('Delete')
  expect(deleteButton).toBeInTheDocument()
  await user.click(deleteButton)
  expect(await mockedService.isDeleteLegoPartFromAPISuccess).toEqual(true)

  const infoToastMessage = screen.getByText('Lego part deleted with success.')
  expect(infoToastMessage).toBeInTheDocument()
  await waitFor(() => expect(ishandleDeleteLegoPartSaveCalled).toEqual(true), { timeout: 3000 })
})

it('LegoPartDeleteModal delete with error', async () => {
  const user = userEvent.setup()
  const mockedService = new MockService()
  mockedService.isDeleteLegoPartFromAPIError = true

  let ishandleDeleteLegoPartSaveCalled = false
  const mockHandleDeleteLegoPartSave = function handleDeleteLegoPartSave () {
    ishandleDeleteLegoPartSaveCalled = true
  }

  render(<LegoPartDeleteModal service = {mockedService}
                              isDeleteLegoPart={true}
                              handleDeleteLegoPartSave = {mockHandleDeleteLegoPartSave}
                              legoPartToDelete = {MockService.mockLegoPart}/>)

  const deleteButton = screen.getByText('Delete')
  expect(deleteButton).toBeInTheDocument()
  await user.click(deleteButton)
  const errorMessage = screen.getByText('Error when deleting lego part.')
  expect(await mockedService.isDeleteLegoPartFromAPISuccess).toEqual(false)
  expect(errorMessage).toBeInTheDocument()

  const infoToastMessage = screen.getByText('Error when deleting lego part.')
  expect(infoToastMessage).toBeInTheDocument()
  await waitFor(() => expect(ishandleDeleteLegoPartSaveCalled).toEqual(true), { timeout: 3000 })
})
