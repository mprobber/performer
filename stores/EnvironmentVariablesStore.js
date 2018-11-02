// @flow
import type EnvironmentVariable from '../models/EnvironmentVariable';

class EnvironmentVariablesStore {
  environmentVariables: EnvironmentVariable[] = [];

  add(environmentVariable: EnvironmentVariable) {
    this.environmentVariables.push(environmentVariable);
  }
}

export default new EnvironmentVariablesStore();
