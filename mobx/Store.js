import { observable } from 'mobx';
import { AsyncStorage } from 'react-native';
import moment from 'moment';

class Store {
  today = moment().format('YYYYMMDD');
  yesterday = moment()
    .subtract(1, 'days')
    .format('YYYYMMDD');
  todayMinus3 = moment()
    .subtract(2, 'days')
    .format('dddd');
  todayMinus4 = moment()
    .subtract(3, 'days')
    .format('dddd');

  @observable
  goal = {
    name: 'name',
    times: 0,
    per: 'day'
  };

  @observable events = [];

  @observable
  chartLegends = [
    this.todayMinus4.slice(0, 3),
    this.todayMinus3.slice(0, 3),
    'Yday',
    'Today'
  ];

  @observable todayEvents = this.getTodayEvents();

  saveReturnUserToken = () => {
    AsyncStorage.setItem('token', 'true');
  };

  setGoal = (key, item) => {
    this.goal[key] = item;
    console.log(this.goal.times);
  };

  //event actions
  addEvent = date => this.events.push(date);

  getGoal = () => {
    return this.goal.times;
  };

  getTodayEvents = () => {
    const result = this.events.slice().filter(event => event === this.today);
    return result.slice().length;
  };

  getYesterdayEvents = () => {
    const result = this.events
      .slice()
      .filter(event => event === this.yesterday);
    return result.slice().length;
  };
}

const store = new Store();

export default store;
