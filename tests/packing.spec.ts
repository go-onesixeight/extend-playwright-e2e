import { expect } from '@playwright/test';
import { MyTaskDetailPage } from '../elements/pages/my-task-detail-page';
import { PickingPage } from '../elements/pages/picking/picking-page';
import { TaskDetailPage } from '../elements/pages/task-detail-page';
import { test } from '../fixtures/default-fixture';
import { PickingService } from '../services/picking-service';

let pickingRequestKey: IPickingRequestKey = null;
let items: Array<any>;

test.afterEach(async ({ pickingService }) => {
  try {
    if (pickingRequestKey && items) {
      await pickingService.cancelPicking(pickingRequestKey, items);
    }
  } catch (Exception) {}
  pickingRequestKey = null;
  items = null;
});

test('Staff able to confirm packing items has been received', async ({
  configuration,
  pickingService,
  taskDetailPage,
  myTaskDetailPage,
  pickingPage,
  packingPage,
  receivingPackingPage,
  page
}) => {
  // Arrange
  items = [configuration.products.itemA, configuration.products.itemB, configuration.products.itemC];
  const taskInfo = await generatePackingTask(items, pickingService, pickingPage, taskDetailPage, myTaskDetailPage);
  await pickingPage.menuComponent.accessPackingModule();
  await packingPage.selectTaskByTaskId(taskInfo.taskId);
  expect(await receivingPackingPage.getTotalOrderCount()).toEqual(items.length);

  // Act
  await receivingPackingPage.confirmReceivedProduct();

  // Assert
  const packingTasks = await packingPage.getAllTasks();
  for (const t of packingTasks) {
    expect(await t.getTaskId()).not.toEqual(taskInfo.taskId);
  }
});

async function generatePackingTask(
  items: Array<any>,
  pickingService: PickingService,
  pickingPage: PickingPage,
  taskDetailPage: TaskDetailPage,
  myTaskDetailPage: MyTaskDetailPage,
) {
  pickingRequestKey = pickingService.generatePickingRequestKey();
  await pickingService.createPickingRequest(pickingRequestKey, items);
  await pickingPage.switchToAllTasks();
  const task = await pickingPage.getTaskByOrderNo(pickingRequestKey.sourceOrderId);
  const taskInfo = await task.getTaskInfo();
  await task.viewTaskDetail();
  await taskDetailPage.gotoPickingProduct();
  await myTaskDetailPage.selectAllProducts();
  await myTaskDetailPage.submitPickAll();

  return taskInfo;
}
