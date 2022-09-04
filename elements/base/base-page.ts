import { Page } from '@playwright/test';
import { HamburgerMenuComponent } from '../components/hamburger-menu-component';

export class BasePage {
  readonly menuComponent: HamburgerMenuComponent;

  protected page: Page;
  protected readonly timeoutBeforeRetry: number;
  protected readonly timeoutForAnimation: number;
  protected maxRetry: number;

  constructor(page: Page) {
    this.page = page;
    this.timeoutBeforeRetry = 1000; // 1 sec
    this.timeoutForAnimation = 1000; // 1 sec
    this.maxRetry = 3;
    this.menuComponent = new HamburgerMenuComponent(this.page, this.page.locator('css=ion-menu ion-content'));
  }

  async ensureNoNetworkRequest(): Promise<this> {
    await this.page.waitForLoadState('networkidle');

    return this;
  }
}
