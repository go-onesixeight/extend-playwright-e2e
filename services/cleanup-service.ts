import { PackingService } from './packing-service';
import { PickingService } from './picking-service';

export class CleanUpService {
  private readonly _pickingService;
  private readonly _packingService;

  constructor(pickingService: PickingService, packingService: PackingService) {
    this._pickingService = pickingService;
    this._packingService = packingService;
  }
}
