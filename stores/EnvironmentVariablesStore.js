// @flow
import EnvironmentVariable from '../models/EnvironmentVariable';

class EnvironmentVariablesStore {
  environmentVariables: EnvironmentVariable[] = [];

  updateOne = (params: { name: string, value: string }) => {
    const currentVariable = this.environmentVariables.find(
      variable => variable.name === params.name,
    );

    if (currentVariable) {
      currentVariable.value = params.value;
    } else {
      this.environmentVariables.push(new EnvironmentVariable(params));
    }
  };

  update = (
    environmentVariableParams: Array<{ name: string, value: string }>,
  ) => {
    const allNames = environmentVariableParams.map(({ name }) => name);
    this.environmentVariables = this.environmentVariables.filter(
      variable => !allNames.includes(variable.name),
    );
    environmentVariableParams.forEach(this.updateOne);
  };
}

export default new EnvironmentVariablesStore();
