class MockService {
  isDeleteLegoPartFromAPISuccess = false
  isDeleteLegoPartFromAPIError = false

  async getAllLegoPartsFromAPI () {
   
  }

  async createLegoPartFromAPI (legoPartJSONString) {
   
  }

  async updateLegoPartFromAPI (legoPartJSONString, legoPartId) {
    
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
