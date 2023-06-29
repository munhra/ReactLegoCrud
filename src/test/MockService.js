class MockService {
  static mockLegoPart = {
    id: '1',
    name: 'Mock Lego Part Name',
    description: 'Mock Lego Part Description',
    part_number: '1234567',
    quantity: '10',
    color: 'blue',
    image: 'part.jpg'
  }

  static mockLegoParts = [MockService.mockLegoPart]

  isDeleteLegoPartFromAPISuccess = false
  isDeleteLegoPartFromAPIError = false

  isCreateLegoPartFromAPISuccess = false
  isCreateLegoPartFromAPIError = false

  isUpdateLegoPartFromAPISuccess = false
  isUpdateLegoPartFromAPIError = false

  async getAllLegoPartsFromAPI () {
   
  }

  async createLegoPartFromAPI (legoPartJSONString) {
    if (this.isCreateLegoPartFromAPIError) {
      throw new Error('Server Error when createLegoPart')
    } else {
      this.isCreateLegoPartFromAPISuccess = true
      return this.mockLegoPartToEdit
    }
  }

  async updateLegoPartFromAPI (legoPartJSONString, legoPartId) {
    if (this.isUpdateLegoPartFromAPIError) {
      throw new Error('Server error when updateLegoPart')
    } else {
      this.isUpdateLegoPartFromAPISuccess = true
      return this.mockLegoPartToEdit
    }
  }

  async deleteLegoPartFromAPI (legoPartId) {
    if (this.isDeleteLegoPartFromAPIError) {
      throw new Error(`Server error when deleting lego part with id ${legoPartId}`)
    } else {
      this.isDeleteLegoPartFromAPISuccess = true
      return legoPartId
    }
  }

  async deleteLegoPartsFromAPI (legoParts) {
    
  }
}

export { MockService }
