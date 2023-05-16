import React from 'react';
import { render, screen } from '@testing-library/react';
import { LegoPartsNavbar } from '../legoPartsNavbar'

it('LegoPartsNavbar renders successfully', () => {
  render(<LegoPartsNavbar />)
  const titleText = screen.getByText(/Lego Part CRUD/i)
  expect(titleText).toBeInTheDocument()
})
