import { env } from 'process';
import * as AppSettings from '../configurations/app-settings.json';
import * as Products from '../configurations/products.json';
import * as Users0 from '../configurations/user-0.json';
import * as Users1 from '../configurations/user-1.json';

export class Configuration {
  settings: { baseUrl: string; baseAdminUrl: string; baseApiUrl: string; baseAdminApiUrl: string };

  appSettings: typeof AppSettings;
  products: typeof Products;
  users: typeof Users0;

  constructor(processIndex) {
    this.appSettings = AppSettings;
    this.products = Products;
    if(processIndex == 0) {
      this.users = Users0;
    } else {
      this.users = Users1;
    }
  }

  getTestEnv(): string {
    return env.TEST_ENV === undefined ? 'Local' : env.TEST_ENV;
  }
}
