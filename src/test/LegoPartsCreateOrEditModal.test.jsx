import React from 'react';
import { render, screen } from '@testing-library/react';
import { LegoPartsCreateOrEditModal } from '../legoPartsCreateOrEditModal'

it('legoPartsCreateOrEditModal renders successfully', () => {
  render(<LegoPartsCreateOrEditModal />)
  //const titleText = screen.getByText(/Lego Part CRUD/i)
  //expect(titleText).toBeInTheDocument()
})
