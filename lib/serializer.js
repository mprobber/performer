// @flow
import { promisify } from 'util';
import fs from 'fs';
import { resolve } from 'path';
import EnvironmentVariableStore from '../stores/EnvironmentVariablesStore';
import ServiceStore from '../stores/ServiceStore';

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

const ConfigLocation = resolve(__dirname, '.test.json');

export const write = async () => {
  const serialized = JSON.stringify({
    environmentVariables: EnvironmentVariableStore.environmentVariables.map(
      environmentVariable => environmentVariable.serialize(),
    ),
    services: ServiceStore.services.map(service => service.serialize()),
  });

  await writeFile(ConfigLocation, serialized);
};

export const read = async () => {
  const file = await readFile(ConfigLocation);
  const { environmentVariables, services } = JSON.parse(file);
  EnvironmentVariableStore.update(environmentVariables);
  ServiceStore.update(services);
};
