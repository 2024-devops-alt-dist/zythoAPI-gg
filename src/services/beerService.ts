import { BaseService } from "./baseService";

class BeerService extends BaseService {
  constructor() {
    super("beer");
  }
}

export default new BeerService();
