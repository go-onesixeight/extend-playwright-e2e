import { Locator, Page } from '@playwright/test';

export class BaseComponent {
  protected page: Page;
  protected componentLocator: Locator;
  protected maxRetry: number;

  constructor(page: Page, componentLocator: Locator) {
    this.page = page;
    this.componentLocator = componentLocator;
    this.maxRetry = 3;
  }
}
