import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'
import { LegoPartsTable } from '../legoPartsTable'
import { MockService } from './MockService'
import userEvent from '@testing-library/user-event'

it('LegoPartsTable renders successfully', () => {
  render(<LegoPartsTable />)
  // verify if table data is loaded correctly
})

it('LegoPartsTable edit button click', async () => {
  const mockLegoParts = MockService.mockLegoParts
  const user = userEvent.setup()
  render(<LegoPartsTable legoParts = {mockLegoParts} />)
  const editButton = screen.getAllByText('Edit')[0]

  await user.click(editButton)
  const editModalTitle = screen.getByText('Edit Lego Part')
  expect(editModalTitle).toBeInTheDocument()
})

it('LegoPartsTable edit modal cancel', async () => {
  const mockLegoParts = MockService.mockLegoParts
  const user = userEvent.setup()
  render(<LegoPartsTable legoParts = {mockLegoParts} />)
  const editButton = screen.getAllByText('Edit')[0]
  await user.click(editButton)
  const editModalTitle = screen.getByText('Edit Lego Part')
  expect(editModalTitle).toBeInTheDocument()
  const cancelEditButton = screen.getByText('Cancel')
  expect(cancelEditButton).toBeInTheDocument()
  await user.click(cancelEditButton)
  expect(editModalTitle).not.toBeInTheDocument()
})

it('LegoPartsTable delete button click', async () => {
  const mockLegoParts = MockService.mockLegoParts
  const user = userEvent.setup()
  render(<LegoPartsTable legoParts = {mockLegoParts} />)
  const deleteButton = screen.getAllByText('Delete')[0]
  await user.click(deleteButton)
  const deleteModalTitle = screen.getByText('Delete Lego Part')
  expect(deleteModalTitle).toBeInTheDocument()
})

it('LegoPartsTable delete modal cancel', async () => {
  const mockLegoParts = MockService.mockLegoParts
  const user = userEvent.setup()
  render(<LegoPartsTable legoParts = {mockLegoParts} />)
  const deleteButton = screen.getAllByText('Delete')[0]
  await user.click(deleteButton)
  const deleteModalTitle = screen.getByText('Delete Lego Part')
  expect(deleteModalTitle).toBeInTheDocument()
  const cancelDeleteButton = screen.getByText('Cancel')
  expect(cancelDeleteButton).toBeInTheDocument()
  await user.click(cancelDeleteButton)
})

it('LegoPartsTable item check button click', async () => {
  const mockLegoParts = MockService.mockLegoParts
  const user = userEvent.setup()

  let isUpdateSelectedLegoPartsCalled = false
  const mockUpdateSelectedLegoParts = function updateSelectedLegoParts () {
    isUpdateSelectedLegoPartsCalled = true
  }
  render(<LegoPartsTable legoParts = {mockLegoParts}
                          updateSelectedLegoParts = {mockUpdateSelectedLegoParts}/>)

  const checkButton = screen.getByTestId('itemCheck_1')
  await user.click(checkButton)
  await waitFor(() => expect(isUpdateSelectedLegoPartsCalled).toEqual(true), { timeout: 3000 })
  isUpdateSelectedLegoPartsCalled = false
  checkButton.checked = true
  await user.click(checkButton)
  await waitFor(() => expect(isUpdateSelectedLegoPartsCalled).toEqual(true), { timeout: 3000 })
})