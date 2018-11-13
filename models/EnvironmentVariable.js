// @flow
import Model from './Model';

interface Schema {
  get name(): string;
  get value(): string;
}

export default class EnvironmentVariable extends Model implements Schema {
  name: string;
  value: string;

  constructor({ name, value }: { name: string, value: string }) {
    super();
    this.name = name;
    this.value = value;
  }

  get key() {
    return this.data.name;
  }

  serialize = () => {
    return { name: this.name, value: this.value };
  };
}
