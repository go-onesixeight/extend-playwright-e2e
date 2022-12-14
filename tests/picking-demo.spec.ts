import { expect, test } from '@playwright/test';
import { PickingPage } from '../elements/my-pages/picking-page';
import { TaskListDetailPage } from '../elements/my-pages/task-list-detail-page';

let randomId: number;

test.beforeEach(async({ request, page })=> {
  randomId = Date.now();
  await request.post('https://slick-picking.extenditresource.com/setPickingRequest', {
    headers: {
      'Ocp-Apim-Subscription-Key': '01fc39fbb6fa408db327523ad59b9309',
    },
    data: {
      pickRequest: {
        pickRequestId: 'TEST'+randomId+'_ART',
        pickRequestDate: '2021-03-15 15:46:28',
        subOrderKey: 'TEST'+randomId+'_ART',
        sourceSubOrderId: 'TEST'+randomId+'_ART',
        orderKey: 'TEST'+randomId+'_ART',
        sourceOrderId: 'TEST'+randomId+'_ART',
        bu: 'CDS',
        sourceBU: 'CDS',
        sourceLoc: '10102',
        status: '1000',
        channel: '0019',
        deliveryType: '0001',
        deliverySubType: '0002',
        fullTaxInvoice: 'N',
        giftWrapFlag: 'N',
        statusReason: 'N/A',
        pickingParam: {
          pickMode: '0001',
          pickAll: 'Y',
          receivingScan: 'N',
          locHandling: 'N',
          pickAllocation: [
            {
              pickAllocationTypeSeq: 1,
              pickAllocationType: '0001',
              pickCatLvl: 0,
            },
          ],
          pickAssignType: '0001',
          pickSubAssignType: '',
          pickPriority: {
            pickPriorityType: '0002',
            pickPriorityLevel: '0001',
            deliveryWindow: [
              {
                startTime: '2021-03-15 10:00:00',
                endTime: '2021-03-15 12:00:00',
              },
            ],
            pickPriorityByTime: [
              {
                pickPriorityLevel: '0001',
                pickPriorityTime: '2021-03-15 09:30:00',
              },
              {
                pickPriorityLevel: '0002',
                pickPriorityTime: '2021-03-15 09:20:00',
              },
            ],
          },
          receiptPhotoTake: 'N',
        },
        items: [
          {
            itemKey: 'IKDEVTEST18032021_C-001',
            sourceItemId: '00847444',
            sourceItemNumber: 1,
            barcode: '8934804034331',
            subBarcodeList: [],
            sku: '1-8474441',
            sourcePrice: 23800.0,
            standardPrice: 0.0,
            currency: 'VND',
            color: '',
            size: '',
            qty: 1.0,
            qtyUnit: 'F',
            weightedItem: 'N',
            weight: 0.0,
            weightUnit: '',
            productNameTH: '',
            productNameEN: 'SUA NESVITA 5 LOAI DAU 180ML*3',
            productNameIT: '',
            productNameDE: '',
            productNameVN: 'SUA NESVITA 5 LOAI DAU 180ML*3',
            imageUrl: 'http://10.250.205.18:8080/Images/Test/00847444-1.png',
            cat1: '',
            cat2: '',
            cat3: '',
            cat4: '',
            cat5: '',
            cat6: '',
            brand: '',
            brandCode: '',
            realBrandCode: '',
            zone: '',
            status: '1000',
            statusReason: null,
            statusDate: '2021-03-15 08:14:41',
            gender: '',
            itemLocCode: '',
            itemLocDesc: '',
            itemAreaCode: '',
            itemAreaDesc: '',
          },
          {
            itemKey: 'IKDEVTEST18032021_C-002',
            sourceItemId: '00860192',
            sourceItemNumber: 2,
            barcode: '8936025773013',
            subBarcodeList: [],
            sku: '1-8601921',
            sourcePrice: 8800.0,
            standardPrice: 0.0,
            currency: 'VND',
            color: '',
            size: '',
            qty: 2.0,
            qtyUnit: 'E',
            weightedItem: 'N',
            weight: 0.0,
            weightUnit: '',
            productNameTH: '',
            productNameEN: 'SCU KUN NHO TUI 110ML',
            productNameIT: '',
            productNameDE: '',
            productNameVN: 'SCU KUN NHO TUI 110ML',
            imageUrl: 'http://10.250.205.18:8080/Images/Test/00860192-1.png',
            cat1: '04',
            cat2: '0460',
            cat3: '046030',
            cat4: '04603001',
            cat5: '0460300101',
            cat6: '',
            brand: '',
            brandCode: '',
            realBrandCode: '',
            zone: '',
            status: '1000',
            statusReason: null,
            statusDate: '2021-03-15 08:14:41',
            gender: '',
            itemLocCode: '',
            itemLocDesc: '',
            itemAreaCode: '',
            itemAreaDesc: '',
          },
          {
            itemKey: 'IKDEVTEST18032021_C-003',
            sourceItemId: '00860193',
            sourceItemNumber: 3,
            barcode: '8936025773013',
            subBarcodeList: [],
            sku: '1-8601923',
            sourcePrice: 8800.0,
            standardPrice: 0.0,
            currency: 'VND',
            color: '',
            size: '',
            qty: 2.0,
            qtyUnit: 'E',
            weightedItem: 'N',
            weight: 0.0,
            weightUnit: '',
            productNameTH: '',
            productNameEN: 'SCU KUN NHO TUI 110ML',
            productNameIT: '',
            productNameDE: '',
            productNameVN: 'SCU KUN NHO TUI 110ML',
            imageUrl: 'http://10.250.205.18:8080/Images/Test/00860192-1.png',
            cat1: '04',
            cat2: '0460',
            cat3: '999999999',
            cat4: '04603001',
            cat5: '0460300101',
            cat6: '',
            brand: '',
            brandCode: '',
            realBrandCode: '',
            zone: '',
            status: '1000',
            statusReason: null,
            statusDate: '2021-03-15 08:14:41',
            gender: '',
            itemLocCode: '',
            itemLocDesc: '',
            itemAreaCode: '',
            itemAreaDesc: '',
          },
        ],
      },
    },
  });
  await page.goto('https://slick-web.extenditresource.com/#/menu/picking');
});

test.afterEach(async({ request })=> {
  await request.post('https://slick-picking.extenditresource.com/setCancelItemStatus', {
    headers: {
      'Ocp-Apim-Subscription-Key': '01fc39fbb6fa408db327523ad59b9309',
    },
    data: {
      lineStatusUpdate: {
        lineStatusUpdateId: 'LineUpdate'+randomId+'_Art',
        pickRequestDate: '2021-03-15 15:46:28',
        subOrderKey: 'TEST'+randomId+'_ART',
        sourceSubOrderId: 'TEST'+randomId+'_ART',
        orderKey: 'TEST'+randomId+'_ART',
        sourceOrderId: 'TEST'+randomId+'_ART',

        bu: 'CDS',
        items: [
          {
            status: '0005',
            statusReason: '',
            itemKey: 'IKDEVTEST18032021_C-001',
            sourceItemId: '00847444',
            sourceItemNumber: 1,
            barcode: '8934804034331',
            subBarcodeList: [],
            sku: '1-8474441',
            sourcePrice: 23800.0,
            standardPrice: 0.0,
            currency: 'VND',
            color: '',
            size: '',
            qty: 1.0,
            qtyUnit: 'F',
            weightedItem: 'N',
            weight: 0.0,
            weightUnit: '',
            productNameTH: '',
            productNameEN: 'SUA NESVITA 5 LOAI DAU 180ML*3',
            productNameIT: '',
            productNameDE: '',
            productNameVN: 'SUA NESVITA 5 LOAI DAU 180ML*3',
            imageUrl: 'http://10.250.205.18:8080/Images/Test/00847444-1.png',
            cat1: '',
            cat2: '',
            cat3: '',
            cat4: '',
            cat5: '',
            cat6: '',
            brand: '',
            brandCode: '',
            realBrandCode: '',
            zone: '',
            statusDate: '2021-03-15 08:14:41',
            gender: '',
            itemLocCode: '',
            itemLocDesc: '',
            itemAreaCode: '',
            itemAreaDesc: '',
          },
          {
            itemKey: 'IKDEVTEST18032021_C-002',
            sourceItemId: '00860192',
            sourceItemNumber: 2,
            barcode: '8936025773013',
            subBarcodeList: [],
            sku: '1-8601921',
            sourcePrice: 8800.0,
            standardPrice: 0.0,
            currency: 'VND',
            color: '',
            size: '',
            qty: 2.0,
            qtyUnit: 'E',
            weightedItem: 'N',
            weight: 0.0,
            weightUnit: '',
            productNameTH: '',
            productNameEN: 'SCU KUN NHO TUI 110ML',
            productNameIT: '',
            productNameDE: '',
            productNameVN: 'SCU KUN NHO TUI 110ML',
            imageUrl: 'http://10.250.205.18:8080/Images/Test/00860192-1.png',
            cat1: '04',
            cat2: '0460',
            cat3: '046030',
            cat4: '04603001',
            cat5: '0460300101',
            cat6: '',
            brand: '',
            brandCode: '',
            realBrandCode: '',
            zone: '',
            status: '0005',
            statusReason: '',
            statusDate: '2021-03-15 08:14:41',
            gender: '',
            itemLocCode: '',
            itemLocDesc: '',
            itemAreaCode: '',
            itemAreaDesc: '',
          },
          {
            itemKey: 'IKDEVTEST18032021_C-003',
            sourceItemId: '00860193',
            sourceItemNumber: 3,
            barcode: '8936025773013',
            subBarcodeList: [],
            sku: '1-8601923',
            sourcePrice: 8800.0,
            standardPrice: 0.0,
            currency: 'VND',
            color: '',
            size: '',
            qty: 2.0,
            qtyUnit: 'E',
            weightedItem: 'N',
            weight: 0.0,
            weightUnit: '',
            productNameTH: '',
            productNameEN: 'SCU KUN NHO TUI 110ML',
            productNameIT: '',
            productNameDE: '',
            productNameVN: 'SCU KUN NHO TUI 110ML',
            imageUrl: 'http://10.250.205.18:8080/Images/Test/00860192-1.png',
            cat1: '04',
            cat2: '0460',
            cat3: '999999999',
            cat4: '04603001',
            cat5: '0460300101',
            cat6: '',
            brand: '',
            brandCode: '',
            realBrandCode: '',
            zone: '',
            status: '0005',
            statusReason: '',
            statusDate: '2021-03-15 08:14:41',
            gender: '',
            itemLocCode: '',
            itemLocDesc: '',
            itemAreaCode: '',
            itemAreaDesc: '',
          },
        ],
      }
    }
  });
});

test.skip('Staff can view new picking task item detail', async ({ page }) => {
  const pickingPage = new PickingPage(page);
  await pickingPage.switchToMenuAllTasks();
  
  const task = await pickingPage.getTaskByPickRequestId('TEST'+randomId+'_ART');
  await task.viewTaskDetail();
  const taskListDetailPage = new TaskListDetailPage(page);
  expect(await taskListDetailPage.getPickRequestId())
     .toEqual('TEST'+randomId+'_ART');
});
