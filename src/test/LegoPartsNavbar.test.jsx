import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'
import { LegoPartsNavbar } from '../legoPartsNavbar'
import { MockService } from './MockService'
import userEvent from '@testing-library/user-event'

it('LegoPartsNavbar renders successfully', () => {
  render(<LegoPartsNavbar />)
  const titleText = screen.getByText(/Lego Part CRUD/i)
  expect(titleText).toBeInTheDocument()
})

it('Add lego part open modal successfully', async () => {
  const user = userEvent.setup()
  const mockedService = new MockService()
  render(<LegoPartsNavbar service = {mockedService} />)
  const addNewLegoPartButton = screen.getByText(/Add New Lego Part/)
  expect(addNewLegoPartButton).toBeInTheDocument()
  await user.click(addNewLegoPartButton)
  const titleText = screen.getByText(/Add Lego Part/)
  expect(titleText).toBeInTheDocument()
})