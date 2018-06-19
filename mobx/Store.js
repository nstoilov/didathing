import { observable } from 'mobx';
import { AsyncStorage } from 'react-native';
import moment from 'moment';

class Store {
  @observable
  thing = {
    name: 'placeholder',
    times: 0,
    per: 'day'
  };

  @observable events = [];

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

  //dummy data
  @observable
  chartData = [
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

  @observable events = [];
  @observable todayEvents = this.getTodayEvents();

  update = (key, item) => {
    this.thing[key] = item;
  };

  saveReturnUserToken = () => {
    AsyncStorage.setItem('token', 'true');
  };

  speakEvents = () =>
    store.events
      .slice()
      .map(event => console.log('event.date', event.date.slice()));

  getTodayEvents = () => {
    const result = store.events
      .slice()
      .filter(event => event.date === this.today);
    console.log('todaysEvents: ', result.slice().length);
    console.log('currentDate', this.today);
    return result.slice().length;
  };

  getYesterdayEvents = () => {
    const result = store.events
      .slice()
      .filter(event => event.date === this.yesterday);
    console.log('yesterdayEvents: ', result.slice().length);
    console.log('yesterday', this.yesterday);
  };

  testMoment = () => {
    const now = moment().format('YYYYMMDD');
    console.log('now: ', now);
    console.log(
      'last week: ',
      moment()
        .subtract(7, 'd')
        .format('YYYYMMDD')
    );
  };
}

const store = new Store();

export default store;
