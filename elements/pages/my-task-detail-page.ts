import { Locator } from '@playwright/test';
import { BasePage } from '../base/base-page';

export class MyTaskDetailPage extends BasePage {
  readonly selectAllCheckboxLocator: Locator = this.page.locator('css=ion-item.item-lines-full mat-checkbox');
  readonly pickAllButtonLocator: Locator = this.page.locator('css=ion-button:has-text("หยิบทั้งหมด")');
  readonly confirmAlertLocator: Locator = this.page.locator('css=ion-alert button.alert-button');

  async selectAllProducts(): Promise<this> {
    await this.selectAllCheckboxLocator.click();
    return this;
  }

  async submitPickAll(): Promise<this> {
    await this.pickAllButtonLocator.click();
    await Promise.all([this.page.waitForNavigation(), this.confirmAlertLocator.click()]);
    return this;
  }
}
