import { BaseService } from "./baseService";

class UserService extends BaseService {
  constructor() {
    super("users");
  }
}

export default new UserService();
