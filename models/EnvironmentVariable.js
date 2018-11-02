// @flow
import Model from './Model';

export default class EnvironmentVariable extends Model {
  data: {
    name: string,
    value: string,
  };

  get key() {
    return this.data.name;
  }
}
