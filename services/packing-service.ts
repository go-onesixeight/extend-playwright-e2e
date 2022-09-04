import { APIRequestContext, APIResponse } from '@playwright/test';
import moment from 'moment';
import { Configuration } from './configuration';

export class PackingService {
  private readonly _request: APIRequestContext;
  private readonly _configuration: Configuration;

  constructor(request: APIRequestContext, configuration: Configuration) {
    this._request = request;
    this._configuration = configuration;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async cancelPacking(pickingRequetKey: IPickingRequestKey, items: any): Promise<APIResponse> {
    // Auto set status Reason to empty
    for (const item of items) {
      item.statusBy = 'Online';
      if (!item.statusReason) {
        item.statusReason = '';
      }
    }
    const timeStamp = moment();
    const response = await this._request.post(
      `https://slick-picking.extenditresource.com/slick-th-dev/pack/v5/setCancelItemStatus`,
      {
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
      },
    );
    return response;
  }
}
