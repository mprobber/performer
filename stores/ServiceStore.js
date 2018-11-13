// @flow
import Service from '../models/Service';

class ServiceStore {
  services: Service[] = [];

  add(service: Service) {
    this.services.push(service);
  }

  updateOne = ({
    name,
    ...params
  }: {
    name: string,
    command: string,
    environmentVariableNames: string[],
  }) => {
    const currentService = this.services.find(service => service.name === name);

    if (currentService) {
      Object.assign(currentService, params);
    } else {
      this.services.push(new Service({ name, ...params }));
    }
  };

  update(
    serviceParams: Array<{
      name: string,
      command: string,
      environmentVariableNames: string[],
    }>,
  ) {
    const allNames = serviceParams.map(({ name }) => name);
    this.services = this.services.filter(
      service => !allNames.includes(service.name),
    );
    serviceParams.forEach(this.updateOne);
  }
}

export default new ServiceStore();
