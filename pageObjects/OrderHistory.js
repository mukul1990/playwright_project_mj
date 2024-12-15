class OrderHistory {
  constructor(page) {
    this.page = page;
    this.rows = page.locator("tr.ng-star-inserted");
  }

  async goToOrderDetails(orderIdValue) {
    const rowCount = await this.rows.count();
    for (let i = 0; i < rowCount; i++) {
      const text = await this.rows.locator("th").nth(i).textContent();
      if (text.includes(orderIdValue)) {
        await this.rows.locator("td button").nth(0).click();
        break;
      }
    }
  }
}

module.exports = {OrderHistory};