import { BaseService } from "./baseService";

class IngredientService extends BaseService {
  constructor() {
    super("ingredient");
  }
}

export default new IngredientService();
