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
  testData = [
    { day: 1, times: 2 },
    { day: 2, times: 4 },
    { day: 3, times: 3 },
    { day: 4, times: 2 }
  ];

  @observable
  chartLegends = [
    this.todayMinus4.slice(0, 3),
    this.todayMinus3.slice(0, 3),
    'Yday',
    'Today'
  ];

  @observable todayEvents = this.getTodayEvents();

  setGoal = (key, item) => {
    this.goal[key] = item;
  };

  addEvent = date => this.events.push(date);

  saveReturnUserToken = () => {
    AsyncStorage.setItem('token', 'true');
  };

  speakEvents = () => {
    console.log('store.events.slice(): ', this.events.slice());
    console.log('today: ', this.today);
  };

  getTodayEvents = () => {
    const result = this.events.slice().filter(event => event === this.today);
    console.log('todaysEvents: ', result.slice().length);
    console.log('currentDate', this.today);
    return result.slice().length;
  };

  getYesterdayEvents = () => {
    const result = this.events
      .slice()
      .filter(event => event === this.yesterday);
    console.log('yesterdayEvents: ', result.slice().length);
    console.log('yesterday', this.yesterday);
  };
}

const store = new Store();

export default store;
