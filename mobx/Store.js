import { observable } from 'mobx';

class Store {
  @observable
  goal = {
    name: 'placeholder',
    times: 0,
    per: 'day'
  };
  @observable events = {};

  update = (key, item) => {
    this.goal[key] = item;
  };
}

const store = new Store();

export default store;
