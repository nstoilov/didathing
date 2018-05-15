import { observable } from 'mobx';

class Store {
  @observable
  thing = {
    name: 'placeholder',
    times: 0,
    per: 'day',
    events: []
  };

  update = (key, item) => {
    this.thing[key] = item;
  };

  speakData = () => console.log(this.thing);
}

const store = new Store();

export default store;
