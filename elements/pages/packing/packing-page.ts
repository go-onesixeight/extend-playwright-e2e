import { Locator } from '@playwright/test';
import { BasePage } from '../../base/base-page';
import { PackingItemComponent } from './packing-item-component';

export class PackingPage extends BasePage {
  readonly inputTaskId: Locator = this.page.locator('css=input[placeholder="ใส่หมายเลขงาน"]');
  readonly taskListLocator: Locator = this.page.locator('css=app-pending-receive-packing');
  readonly taskItemsLocator: Locator = this.taskListLocator.locator('css=ion-list');

  async selectTaskByTaskId(taskId: string): Promise<this> {
    await this.inputTaskId.fill(taskId);
    await Promise.all([this.page.waitForNavigation(), this.page.keyboard.press('Enter')]);

    return this;
  }

  async getAllTasks(): Promise<Array<PackingItemComponent>> {
    const tasks: Array<PackingItemComponent> = [];
    await (await this.taskListLocator.elementHandle()).waitForElementState('stable');
    for (let i = 0; i < (await this.taskItemsLocator.count()); i++) {
      tasks.push(new PackingItemComponent(this.page, this.taskItemsLocator.nth(i)));
    }

    return tasks;
  }
}
