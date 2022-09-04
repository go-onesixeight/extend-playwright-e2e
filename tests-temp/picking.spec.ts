import { expect } from '@playwright/test';
import { test } from '../fixtures/default-fixture';

let pickingRequestKey: IPickingRequestKey = null;
let items: any;
test.afterEach(async ({ pickingService }) => {
  try {
    if (pickingRequestKey && items) {
      await pickingService.cancelPicking(pickingRequestKey, items);
    }
  } catch (Exception) {}
  pickingRequestKey = null;
  items = null;
});

test('Staff should see new task with correct info', async ({ configuration, pickingService, pickingPage }) => {
  // Arrange
  pickingRequestKey = null;
  pickingRequestKey = pickingService.generatePickingRequestKey();
  items = [configuration.products.itemA, configuration.products.itemB, configuration.products.itemC];
  await pickingService.createPickingRequest(pickingRequestKey, items);
  await pickingPage.switchToAllTasks();

  // Act
  const task = await pickingPage.getTaskByOrderNo(pickingRequestKey.sourceOrderId);

  // Assert
  const taskInfo = await task.getTaskInfo();
  expect(parseInt(taskInfo.taskId)).toBeGreaterThan(0);
  expect(taskInfo.orderNo).toEqual(pickingRequestKey.sourceOrderId);
  expect(taskInfo.requestDate).toEqual(pickingRequestKey.pickRequestDate.split(' ')[0]);
});

test('Staff able to confirm picking for the new task item', async ({
  configuration,
  pickingService,
  pickingPage,
  taskDetailPage,
  myTaskDetailPage,
}) => {
  // Arrange
  pickingRequestKey = null;
  pickingRequestKey = pickingService.generatePickingRequestKey();
  items = [configuration.products.itemA, configuration.products.itemB, configuration.products.itemC];
  await pickingService.createPickingRequest(pickingRequestKey, items);
  await pickingPage.switchToAllTasks();
  const task = await pickingPage.getTaskByOrderNo(pickingRequestKey.sourceOrderId);
  const taskInfo = await task.getTaskInfo();
  await task.viewTaskDetail();
  await taskDetailPage.gotoPickingProduct();
  await myTaskDetailPage.selectAllProducts();

  // Act
  await myTaskDetailPage.submitPickAll();

  // Assert
  await pickingPage.switchToAllTasks();
  const tasks = await pickingPage.getAllTasks();
  for (const t of tasks) {
    expect(await t.getTaskId()).not.toEqual(taskInfo.taskId);
  }
});
