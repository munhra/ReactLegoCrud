import React from 'react'
import { Service } from './service'
import { LegoPartsNavbar } from './legoPartsNavbar'

export class LegoPartsCRUD extends React.Component {
  render () {
    return (
      <>
        <LegoPartsNavbar service = {new Service()}/>
      </>
    )
  }
}
