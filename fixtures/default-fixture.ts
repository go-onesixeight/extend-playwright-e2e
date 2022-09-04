import { test as base } from '@playwright/test';
import { MyTaskDetailPage } from '../elements/pages/my-task-detail-page';
import { PackingPage } from '../elements/pages/packing/packing-page';
import { ReceivingPackingPage } from '../elements/pages/packing/receiving-packing-page';
import { PickingPage } from '../elements/pages/picking/picking-page';
import { TaskDetailPage } from '../elements/pages/task-detail-page';
import { Configuration } from '../services/configuration';
import { PackingService } from '../services/packing-service';
import { PickingService } from '../services/picking-service';

interface TestFixtures {
  configuration: Configuration;

  // Services
  pickingService: PickingService;
  packingService: PackingService;

  // Pages
  pickingPage: PickingPage;
  taskDetailPage: TaskDetailPage;
  myTaskDetailPage: MyTaskDetailPage;
  packingPage: PackingPage;
  receivingPackingPage: ReceivingPackingPage;
}

const test = base.extend<TestFixtures>({
  configuration: async ({ page }, use, testInfo) => {
    const configuration = new Configuration(testInfo.parallelIndex);
    await page.goto(configuration.appSettings.baseUrl);
    await use(configuration);
  },
  pickingService: async ({ request, configuration }, use) => {
    const pickingService = new PickingService(request, configuration);
    await use(pickingService);
  },
  packingService: async ({ request, configuration }, use) => {
    const packingService = new PackingService(request, configuration);
    await use(packingService);
  },
  pickingPage: async ({ page }, use) => {
    const pickingPage = new PickingPage(page);
    await use(pickingPage);
  },
  taskDetailPage: async ({ page }, use) => {
    const taskDetailPage = new TaskDetailPage(page);
    await use(taskDetailPage);
  },
  myTaskDetailPage: async ({ page }, use) => {
    const myTaskDetailPage = new MyTaskDetailPage(page);
    await use(myTaskDetailPage);
  },
  packingPage: async ({ page }, use) => {
    const packingPage = new PackingPage(page);
    await use(packingPage);
  },
  receivingPackingPage: async ({ page }, use) => {
    const receivingPackingPage = new ReceivingPackingPage(page);
    await use(receivingPackingPage);
  },
});

export { test };
