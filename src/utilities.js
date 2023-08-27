import { Service } from './service'

class Utilities {
  static service = new Service()
  sortLegoPartNumbers (legoParts) {
    legoParts.sort((p1, p2) => {
      if (p1.name > p2.name) {
        return 1
      }
      if (p1.name < p2.name) {
        return -1
      }
      return 0
    })
  }

  getLegoPartByID (legoPartID, legoParts) {
    return legoParts.find((legoPart) => legoPart.id === legoPartID)
  }

  getLegoPartIDFromComponent (componentID) {
    const splittedComponentID = componentID.split('_')
    return splittedComponentID[1]
  }

  removeSelectedLegoPart (legoPartID, selectedLegoParts) {
    const legoPartIndex = selectedLegoParts.findIndex((legoPart) => legoPart.id === legoPartID)
    if (legoPartIndex > -1) {
      selectedLegoParts.splice(legoPartIndex, 1)
    }
  }

  cloneLegoParts (legoParts) {
    const clonedLegoParts = []
    legoParts.forEach(legoPart => {
      clonedLegoParts.push(legoPart)
    })
    return clonedLegoParts
  }

  async fetchAllLegoPartsFromAPI () {
    try {
      const legoParts = await Utilities.service.getAllLegoPartsFromAPI()
      this.sortLegoPartNumbers(legoParts)
      return legoParts
    } catch (error) {
      return error
    }
  }
}

export { Utilities }
