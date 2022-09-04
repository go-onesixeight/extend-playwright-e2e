import { Locator, Page } from '@playwright/test';
import { TaskItemComponent } from './task-item-component';

export class PickingPage {
  readonly page: Page;
  readonly menuAllTasksLocator: Locator;
  readonly taskListLocator: Locator;
  readonly taskItemsLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuAllTasksLocator = 
      this.page.locator('css=div.sub-option >> text=งานทั้งหมด');
    this.taskListLocator = this.page.locator('css=app-task-list');
    this.taskItemsLocator = this.taskListLocator.locator('css=ion-list');
  }

  async switchToMenuAllTasks() {
    await this.menuAllTasksLocator.click();
    await this.page.waitForLoadState('networkidle');
    await (await this.taskListLocator.elementHandle())
      .waitForElementState('stable');
  }

  async getAllTasks() {
    const tasks: Array<TaskItemComponent> = [];
    for (let i = 0; i < (await this.taskItemsLocator.count()); i++) {
      const taskItemComponent = 
        new TaskItemComponent(this.page, this.taskItemsLocator.nth(i));
      tasks.push(taskItemComponent);
    }
    return tasks;
  }

  async getTaskByPickRequestId(pickRequestId: string) {
    const tasks = await this.getAllTasks();
    for(let task of tasks) {
      if(pickRequestId === await task.getPickRequestId()) {
        return task;
      }
    }
    throw new Error('Can\'t find pickRequestId '+ pickRequestId);
  }

}
