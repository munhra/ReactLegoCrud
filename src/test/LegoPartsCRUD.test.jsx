import React from 'react';
import { render, screen } from '@testing-library/react';
import { LegoPartsCRUD } from '../legoPartsCRUD'

it('LegoPartsCRUD renders successfully', () => {
  render(<LegoPartsCRUD />)
  const titleText = screen.getByText(/Lego Part CRUD/i)
  expect(titleText).toBeInTheDocument()
})
