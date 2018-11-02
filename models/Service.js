// @flow
import Model from './Model';
import Process from './Process';
import type EnvironmentVariable from './EnvironmentVariable';

interface Schema {
  get name(): string;
  get command(): string;
  get environmentVariables(): EnvironmentVariable[];
}

export default class Service extends Model implements Schema {
  // TODO(mp) - better streams
  /* eslint-disable-next-line no-console */
  process: Process = new Process(this.command, console.log, console.error);
  get name() {
    return '';
  }

  get command() {
    return '';
  }

  get environmentVariables() {
    return [];
  }
}
