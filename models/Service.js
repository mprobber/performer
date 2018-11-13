// @flow
import Model from './Model';
import Process from './Process';
import type EnvironmentVariable from './EnvironmentVariable';
import EnvironmentVariablesStore from '../stores/EnvironmentVariablesStore';

interface Schema {
  get name(): string;
  get command(): string;
  get environmentVariables(): EnvironmentVariable[];
}

export default class Service extends Model implements Schema {
  // TODO(mp) - better streams
  /* eslint-disable-next-line no-console */
  process: Process = new Process(
    this.command,
    b => console.log(b.toString()),
    b => console.error(b.toString()),
  );
  name: string;
  command: string;
  environmentVariableNames: string[];

  constructor({
    name,
    command,
    environmentVariableNames,
  }: {
    name: string,
    command: string,
    environmentVariableNames: string[],
  }) {
    super();
    this.name = name;
    this.process.command = command;
    this.command = command;
    this.environmentVariableNames = environmentVariableNames;
  }

  get status() {
    return this.process.status;
  }

  get environmentVariables() {
    return EnvironmentVariablesStore.environmentVariables.filter(({ name }) =>
      this.environmentVariableNames.includes(name),
    );
  }

  serialize = () => {
    return {
      name: this.name,
      command: this.command,
      environmentVariableNames: this.environmentVariableNames,
      status: this.status,
    };
  };
}
