import React from 'react';
import { render, screen } from '@testing-library/react'
import { LegoPartsTable } from '../legoPartsTable'
import { MockService } from './MockService'
import userEvent from '@testing-library/user-event'

it('LegoPartsTable renders successfully', () => {
  render(<LegoPartsTable />)
  // const titleText = screen.getByText(/Lego Part CRUD/i)
  // expect(titleText).toBeInTheDocument()
})

it('LegoPartsTable edit button click', async () => {
  const mockLegoParts = MockService.mockLegoParts
  const user = userEvent.setup()
  render(<LegoPartsTable legoParts = {mockLegoParts} />)
  const editButton = screen.getByText('Edit')
  await user.click(editButton)
  const editModalTitle = screen.getByText('Edit Lego Part')
  expect(editModalTitle).toBeInTheDocument()
})

it('LegoPartsTable delete button click', async () => {
  const mockLegoParts = MockService.mockLegoParts
  const user = userEvent.setup()
  render(<LegoPartsTable legoParts = {mockLegoParts} />)
  const deleteButton = screen.getByText('Delete')
  await user.click(deleteButton)
  const deleteModalTitle = screen.getByText('Delete Lego Part')
  expect(deleteModalTitle).toBeInTheDocument()
})