import { Locator, Page } from "@playwright/test";

export class TaskListDetailPage {
  readonly page:Page;
  readonly taskIdLabelLocator: Locator;
  readonly pickRequestIdLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.taskIdLabelLocator = this.page.locator(
'css=ion-row.detail-ion-row >> nth=0 >> css=ion-col.ion-text-right ion-text');
    this.pickRequestIdLocator = this.page.locator(
'css=ion-row.detail-ion-row >> nth=1 >> css=ion-col.ion-text-right ion-text');
  }

  async getTaskId() {
    let taskId = await this.taskIdLabelLocator.textContent();
    return taskId.trim();
  }

  async getPickRequestId() {
    let pickRequestId = await this.pickRequestIdLocator.textContent();
    return pickRequestId.trim();
  }

}