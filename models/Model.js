// @flow

export default class Model {
  data: Object;

  constructor(s?: ?string) {
    this.data = s ? JSON.parse(s) : {};
  }

  get key(): string {
    throw new Error('Method must be implemented on child class of Model');
  }

  serialize = () => {
    return JSON.stringify(this.data);
  };
}
