import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { LegoPartDeleteSelectedModal } from '../legoPartDeleteSelectedModal'
import { MockService } from './MockService'
import userEvent from '@testing-library/user-event'

it('LegoPartDeleteSelectedModal renders successfully', () => {
  render(<LegoPartDeleteSelectedModal service = {new MockService()}
                                      selectedLegoParts = {MockService.selectedLegoParts}
                                      isDeleteSelectedLegoParts = {true}/>)

  const titleText = screen.getByText('Delete Selected Lego Part(s)')
  const subTitleText = screen.getByText('Are you sure to delete selected lego part(s) ?')
  expect(titleText).toBeInTheDocument()
  expect(subTitleText).toBeInTheDocument()
})

it('LegoPartDeleteSelectedModal cancel', async () => {
  let ishandleDeleteSelectedLegoPartsCloseCalled = false
  const mockHandleDeleteSelectedLegoPartsClose = function handleDeleteSelectedLegoPartsClose () {
    ishandleDeleteSelectedLegoPartsCloseCalled = true
  }
  render(<LegoPartDeleteSelectedModal service = {new MockService()}
                                      selectedLegoParts = {MockService.selectedLegoParts}
                                      handleDeleteSelectedLegoPartsClose = {mockHandleDeleteSelectedLegoPartsClose}
                                      isDeleteSelectedLegoParts = {true}/>)

  const user = userEvent.setup()
  const cancelButton = screen.getByText('Cancel')
  expect(cancelButton).toBeInTheDocument()
  await user.click(cancelButton)
  expect(ishandleDeleteSelectedLegoPartsCloseCalled).toEqual(true)
})

it('LegoPartDeleteSelectedModal delete with success', async () => {
  let ishandleDeleteSelectedLegoPartsSaveCalled = false
  const mockHandleDeleteSelectedLegoPartsSave = function handleDeleteSelectedLegoPartsSave () {
    ishandleDeleteSelectedLegoPartsSaveCalled = true
  }
  render(<LegoPartDeleteSelectedModal service = {new MockService()}
                                      selectedLegoParts = {MockService.mockSelectedLegoParts}
                                      handleDeleteSelectedLegoPartsSave = {mockHandleDeleteSelectedLegoPartsSave}
                                      isDeleteSelectedLegoParts = {true}/>)

  const user = userEvent.setup()
  const deleteButton = screen.getByText('Delete')
  expect(deleteButton).toBeInTheDocument()
  await user.click(deleteButton)
  const infoToastMessage = screen.getByText('Selected lego parts deleted with success.')
  expect(infoToastMessage).toBeInTheDocument()
  await waitFor(() => expect(ishandleDeleteSelectedLegoPartsSaveCalled).toEqual(true), { timeout: 3000 })
})

it('LegoPartDeleteSelectedModal delete with error', async () => {
  let ishandleDeleteSelectedLegoPartsSaveCalled = false
  const mockHandleDeleteSelectedLegoPartsSave = function handleDeleteSelectedLegoPartsSave () {
    ishandleDeleteSelectedLegoPartsSaveCalled = true
  }
  const mockService = new MockService()
  mockService.isDeleteLegoPartsFromAPIError = true

  render(<LegoPartDeleteSelectedModal service = {mockService}
                                      selectedLegoParts = {MockService.mockSelectedLegoParts}
                                      handleDeleteSelectedLegoPartsSave = {mockHandleDeleteSelectedLegoPartsSave}
                                      isDeleteSelectedLegoParts = {true}/>)

  const user = userEvent.setup()
  const deleteButton = screen.getByText('Delete')
  expect(deleteButton).toBeInTheDocument()
  await user.click(deleteButton)
  const infoToastMessage = screen.getByText('Error when deleting one or more lego parts.')
  expect(infoToastMessage).toBeInTheDocument()
  await waitFor(() => expect(ishandleDeleteSelectedLegoPartsSaveCalled).toEqual(true), { timeout: 3000 })
})
