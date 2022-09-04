import { APIRequestContext, APIResponse } from '@playwright/test';
import moment from 'moment';
import { Configuration } from './configuration';

export class PickingService {
  private readonly _request: APIRequestContext;
  private readonly _configuration: Configuration;

  constructor(request: APIRequestContext, configuration: Configuration) {
    this._request = request;
    this._configuration = configuration;
  }

  generatePickingRequestKey(): IPickingRequestKey {
    const timeStamp = moment();
    return {
      pickRequestId: `AUT_${timeStamp.valueOf()}`,
      pickRequestDate: timeStamp.format('YYYY-MM-DD hh:mm:ss'),
      subOrderKey: `SOAUT_${timeStamp.valueOf()}`,
      sourceSubOrderId: `SSOX10_${timeStamp.valueOf()}-1`,
      orderKey: `OKAUT_${timeStamp.valueOf()}-1`,
      sourceOrderId: `SOIAUT_${timeStamp.valueOf()}`,
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async createPickingRequest(pickingRequetKey: IPickingRequestKey, items: any): Promise<APIResponse> {
    const response = await this._request.post(`${this._configuration.appSettings.baseAPIUrl}/setPickingRequest`, {
      headers: {
        'Ocp-Apim-Subscription-Key': this._configuration.appSettings.SubscriptionKey,
      },
      data: {
        pickRequest: {
          pickRequestId: pickingRequetKey.pickRequestId,
          pickRequestDate: pickingRequetKey.pickRequestDate,
          subOrderKey: pickingRequetKey.subOrderKey,
          sourceSubOrderId: pickingRequetKey.sourceSubOrderId,
          orderKey: pickingRequetKey.orderKey,
          sourceOrderId: pickingRequetKey.sourceOrderId,
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
          items: items,
        },
      },
    });
    return response;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async cancelPicking(pickingRequetKey: IPickingRequestKey, items: any): Promise<APIResponse> {
    // Auto set status Reason to empty
    for (const item of items) {
      if (!item.statusReason) {
        item.statusReason = '';
      }
    }
    const timeStamp = moment();
    const response = await this._request.post(`${this._configuration.appSettings.baseAPIUrl}/setCancelItemStatus`, {
      headers: {
        'Ocp-Apim-Subscription-Key': this._configuration.appSettings.SubscriptionKey,
      },
      data: {
        lineStatusUpdate: {
          lineStatusUpdateId: `LineUpdate00000${timeStamp.unix()}`,
          pickRequestDate: pickingRequetKey.pickRequestDate,
          subOrderKey: pickingRequetKey.subOrderKey,
          sourceSubOrderId: pickingRequetKey.sourceSubOrderId,
          orderKey: pickingRequetKey.orderKey,
          sourceOrderId: pickingRequetKey.sourceOrderId,
          bu: 'CDS',
          items: items,
        },
      },
    });
    return response;
  }
}
