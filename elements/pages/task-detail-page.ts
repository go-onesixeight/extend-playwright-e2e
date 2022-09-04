import { Locator } from '@playwright/test';
import { BasePage } from '../base/base-page';

export class TaskDetailPage extends BasePage {
  readonly taskListDetailContainerLocator: Locator = this.page.locator('css=app-task-list-detail');
  readonly pickingProductButtonLocator: Locator = this.taskListDetailContainerLocator.locator(
    'css=ion-footer div.active-bt >> nth=1',
  );
  readonly acceptPickingButtonLocator: Locator = this.page.locator('#BottomSheet ion-button.ion-activatable >> nth=0');
  readonly taskIdLabelLocator: Locator = this.page.locator('css=ion-row.detail-ion-row ion-col.ion-text-right ion-text >> nth=0');
  readonly pickRequestIdLabelLocator: Locator = this.page.locator('css=ion-row.detail-ion-row ion-col.ion-text-right ion-text >> nth=1');
  readonly totalItemCountLabelLocator: Locator = this.page.locator('css=ion-item.item-lines-full ion-text');

  async getTaskId() {
    let taskId = await this.taskIdLabelLocator.textContent();
    return taskId.trim();
  }

  async getPickRequestId() {
    let pickRequestId = await this.pickRequestIdLabelLocator.textContent();
    return pickRequestId.trim();
  }

  async getTotalItemCount() {
    let totalItems = await this.totalItemCountLabelLocator.textContent();
    totalItems = totalItems.replace('สินค้าทั้งหมด', '').replace('รายการ', '');
    return parseInt(totalItems.trim());
  }

  async gotoPickingProduct(): Promise<this> {
    await this.pickingProductButtonLocator.click();
    await Promise.all([this.page.waitForNavigation(), this.acceptPickingButtonLocator.click()]);
    return this;
  }
}
