import { Locator } from '@playwright/test';
import { BaseComponent } from '../../base/base-component';

export class PickingItemComponent extends BaseComponent {
  readonly taskIdLabelLocator: Locator = this.componentLocator.locator('css=h3');
  readonly pickRequestDateLabelLocator: Locator = 
    this.componentLocator.locator('css=p >> nth=2');
  readonly orderNoLabelLocator: Locator = 
    this.componentLocator.locator('css=p >> nth=4');
  readonly addTaskButtonLocator: Locator = this.componentLocator.locator('css=ion-button');

  async getTaskId(): Promise<string> {
    const txt = await this.taskIdLabelLocator.textContent();
    return txt.split('(')[0].trim();
  }

  async getRequestDate(): Promise<string> {
    const txt = await this.pickRequestDateLabelLocator.textContent();
    const re = new RegExp('.*([0-9]{4}-[0-9]{2}-[0-9]{2}).*');
    return re.exec(txt)[1];
  }

  async getOrderNo(): Promise<string> {
    const txt = await this.orderNoLabelLocator.textContent();
    return txt.split(':')[1].trim();
  }

  async getTaskInfo(): Promise<{ taskId: string; requestDate: string; orderNo: string }> {
    const taskId = await this.getTaskId();
    const requestDate = await this.getRequestDate();
    const orderNo = await this.getOrderNo();

    return { taskId, requestDate, orderNo };
  }

  async addTask(): Promise<this> {
    await this.addTaskButtonLocator.click();
    return this;
  }

  async viewTaskDetail(): Promise<this> {
    await Promise.all([this.page.waitForNavigation(), this.componentLocator.click()]);
    return this;
  }
}
