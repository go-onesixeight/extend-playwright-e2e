import { expect, Locator } from '@playwright/test';
import { BasePage } from '../../base/base-page';
import { PackingItemDetailComponent } from './packing-item-detail-component';

export class ReceivingPackingPage extends BasePage {
  readonly totalOrderLabelLocator: Locator = this.page.locator('css=ion-item.item-lines-full ion-text', {
    hasText: 'สินค้าทั้งหมด',
  });

  // Packing Items
  readonly packingItemsLocator: Locator = this.page.locator(
    'css=div.content-view ion-item.item-lines-none.ion-activatable',
  );
  readonly packingItemsLabel: Locator = this.page.locator('css=div.content-view ion-text.ion-color-success');

  readonly confirmReceiveProductsButton: Locator = this.page.locator('css=ion-button', { hasText: 'ยืนยันการรับของ' });
  readonly confirmAlertLocator: Locator = this.page.locator('css=ion-alert button.alert-button', {
    hasText: 'ยืนยัน',
  });

  async getTotalOrderCount(): Promise<number> {
    const totalText = await this.totalOrderLabelLocator.innerText();
    const re = new RegExp('.*สินค้าทั้งหมด.*([0-9]+).*รายการ.*');
    return parseInt(re.exec(totalText)[1]);
  }

  async getAllPackingItems(): Promise<Array<PackingItemDetailComponent>> {
    const packingItems: Array<PackingItemDetailComponent> = [];
    await expect(this.packingItemsLocator.first()).toBeVisible();
    for (let i = 0; i < (await this.packingItemsLocator.count()); i++) {
      packingItems.push(
        new PackingItemDetailComponent(this.page, this.packingItemsLocator.nth(i), this.packingItemsLabel.nth(i)),
      );
    }
    return packingItems;
  }

  async confirmReceivedProduct(): Promise<this> {
    await this.confirmReceiveProductsButton.click();
    await Promise.all([this.page.waitForNavigation(), this.confirmAlertLocator.click()]);

    return this;
  }
}
