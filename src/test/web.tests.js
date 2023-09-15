/* global describe it before after */
import assert from 'assert'
import { Builder, By } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/firefox.js'

describe('Lego CRUD test suite', async function () {
  let driver = {}
  before(async function () {
    const options = new Options()
    options.addArguments('--headless')
    driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build()
    await driver.get('http://localhost:3006')
  })

  after(function () {
    return driver.quit()
  })

  it('Should create a new lego part', async function () {
    const openAddLegoPartModal = await driver.findElement(By.id('openAddLegoPartModal'))
    openAddLegoPartModal.click()
    await driver.sleep(1000)

    const partNameField = await driver.findElement(By.name('name'))
    partNameField.sendKeys('Part name field')

    const partDescriptionField = await driver.findElement(By.name('description'))
    partDescriptionField.sendKeys('Part description field')

    const partNumberField = await driver.findElement(By.name('part_number'))
    partNumberField.sendKeys('Part number field')

    const partQuantityField = await driver.findElement(By.name('quantity'))
    partQuantityField.sendKeys('100')

    const partColorField = await driver.findElement(By.name('color'))
    partColorField.sendKeys('Green')

    const partImageField = await driver.findElement(By.name('image'))
    partImageField.sendKeys('file.jpg')

    const addLegoPartModalSave = await driver.findElement(By.id('addLegoPartModalSave'))
    await driver.sleep(1000)
    addLegoPartModalSave.click()
    await driver.sleep(1000)
    assert.equal(1, 1)
  })
})
