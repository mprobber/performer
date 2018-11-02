// @flow
import type Service from '../models/Service';

class ServiceStore {
  services: Service[] = [];

  add(service: Service) {
    this.services.push(service);
  }
}

export default new ServiceStore();
