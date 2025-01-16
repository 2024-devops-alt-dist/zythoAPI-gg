import { BaseService } from "./baseService";

class CategoryService extends BaseService {
  constructor() {
    super("category");
  }
}

export default new CategoryService();
