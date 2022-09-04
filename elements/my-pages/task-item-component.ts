import { Locator, Page } from '@playwright/test';

export class TaskItemComponent {
  readonly page: Page;
  readonly componentLocator: Locator;
  readonly taskIdLocator: Locator;
  readonly pickRequestIdLocator: Locator;

  constructor(page: Page, componentLocator: Locator) {
    this.page = page;
    this.componentLocator = componentLocator;
    this.taskIdLocator = this.componentLocator.locator('css=h3');
    this.pickRequestIdLocator = this.componentLocator.locator('css=p >> nth=1');
  }
  async getTaskId() {
    let taskId = await this.taskIdLocator.textContent();
    return taskId.split('(')[0].trim();
  }
  async getPickRequestId() {
    let pickRequestId = await this.pickRequestIdLocator.textContent();
    return pickRequestId.split(':')[1].trim();
  }
  async viewTaskDetail() {
    await Promise.all([
      this.page.waitForNavigation(),
      this.componentLocator.click()
    ]);
  }
}
