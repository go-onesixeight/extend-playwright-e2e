import { Locator } from '@playwright/test';
import { BaseComponent } from '../base/base-component';

export class HamburgerMenuComponent extends BaseComponent {
  readonly menuLocator: Locator = this.page.locator('css=ion-menu-button');
  readonly packingMenuLocator: Locator = this.componentLocator.locator('css=ion-item', { hasText: 'Packing' });

  async accessPackingModule(): Promise<this> {
    await this.menuLocator.click();
    await Promise.all([this.page.waitForNavigation(), this.packingMenuLocator.click()]);

    return this;
  }
}
