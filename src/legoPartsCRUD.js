import React from 'react'
import { Service } from './service.js'
import { LegoPartsNavbar } from './legoPartsNavbar.js'

export class LegoPartsCRUD extends React.Component {
  render () {
    return (
      <>
        <LegoPartsNavbar service = {new Service()}/>
      </>
    )
  }
}
