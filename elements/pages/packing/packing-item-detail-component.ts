import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../../base/base-component';

export class PackingItemDetailComponent extends BaseComponent {
  readonly totalLabelLocator: Locator;
  readonly barcodeLocator: Locator = this.componentLocator.locator('css=p:has(ion-icon[name="barcode"])');
  readonly shipQuantityLocator: Locator = this.componentLocator.locator('css=ion-chip ion-label');

  constructor(page: Page, componentLocator: Locator, totalLabelLocator: Locator) {
    super(page, componentLocator);
    this.totalLabelLocator = totalLabelLocator;
  }

  async getBarCode(): Promise<string> {
    return (await this.barcodeLocator.innerText()).trim();
  }

  async getShipQty(): Promise<number> {
    return parseInt((await this.shipQuantityLocator.innerText()).trim());
  }

  async getTotalOrderQty(): Promise<number> {
    return parseInt((await this.totalLabelLocator.innerText()).split('/')[1].trim());
  }

  async getItemDetail(): Promise<{ barcode: string; shipQty: number; totalQtry: number }> {
    return {
      barcode: await this.getBarCode(),
      shipQty: await this.getShipQty(),
      totalQtry: await this.getTotalOrderQty(),
    };
  }
}
