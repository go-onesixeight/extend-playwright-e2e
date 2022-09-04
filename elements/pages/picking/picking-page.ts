import { Locator } from '@playwright/test';
import { BasePage } from '../../base/base-page';
import { PickingItemComponent } from './picking-item-component';

export class PickingPage extends BasePage {
  readonly menuAllTasks: Locator = this.page.locator('div.sub-option >> text=งานทั้งหมด');

  readonly taskListLocator: Locator = this.page.locator('css=app-task-list');
  readonly taskItemsLocator: Locator = this.taskListLocator.locator('css=ion-list');

  async switchToAllTasks(): Promise<this> {
    await this.menuAllTasks.click();
    await this.ensureNoNetworkRequest();
    await (await this.taskListLocator.elementHandle()).waitForElementState('stable');
    
    return this;
  }

  async getAllTasks(): Promise<Array<PickingItemComponent>> {
    const tasks: Array<PickingItemComponent> = [];
    for (let i = 0; i < (await this.taskItemsLocator.count()); i++) {
      tasks.push(new PickingItemComponent(this.page, this.taskItemsLocator.nth(i)));
    }

    return tasks;
  }

  async getTaskByOrderNo(orderNo: string): Promise<PickingItemComponent> {
    const tasks = await this.getAllTasks();
    for (const task of tasks) {
      if ((await task.getOrderNo()) === orderNo) {
        return task;
      }
    }
    throw new Error(`Can't find the OrderNo ${orderNo}`);
  }
}
