import React from 'react';
import { render, screen } from '@testing-library/react';
import { LegoPartsTable } from '../legoPartsTable'

it('LegoPartsTable renders successfully', () => {
  render(<LegoPartsTable />)
  // const titleText = screen.getByText(/Lego Part CRUD/i)
  // expect(titleText).toBeInTheDocument()
})
