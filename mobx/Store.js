import { observable } from 'mobx';
import { AsyncStorage } from 'react-native';

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

  saveReturnUserToken = () => {
    AsyncStorage.setItem('token', 'true');
  };

  speakData = () => console.log(this.thing);
}

const store = new Store();

export default store;
