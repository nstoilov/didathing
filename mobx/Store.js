import { observable } from 'mobx';
import { create, persist } from 'mobx-persist';
import { AsyncStorage } from 'react-native';
import moment from 'moment';

class Store {
  @persist('object')
  @observable
  goal = {
    name: 'name',
    times: 0,
    per: 'day'
  };

  @persist('list')
  @observable
  events = [];
  /*
  getChartEvents = () => {
    const result = [
      this.getEventsDays(3),
      this.getEventsDays(2),
      this.getEventsDays(1),
      this.getEventsDays(0)
    ];
    return result;
  };


  getChartEventsOld = () => {
    switch (this.chartMode) {
      case 'days':
        return [
          this.getEventsDays(3),
          this.getEventsDays(2),
          this.getEventsDays(1),
          this.getEventsDays(0)
        ];
      case 'weeks':
        return [
          this.getEventsWeeks(3),
          this.getEventsWeeks(2),
          this.getEventsWeeks(1),
          this.getEventsWeeks(0)
        ];
      case 'months':
        return [
          this.getEventsMonths(3),
          this.getEventsMonths(2),
          this.getEventsMonths(1),
          this.getEventsMonths(0)
        ];
      default:
        return [];
    }
  };
  */

  getChartEvents = () => {
    const data = [3, 2, 1, 0];
    switch (this.chartMode) {
      case 'days':
        return data.map(x => this.getEventsDays(x));
      case 'weeks':
        return data.map(x => this.getEventsWeeks(x));
      case 'months':
        return data.map(x => this.getEventsMonths(x));
      default:
        return [];
    }
  };

  @persist
  @observable
  chartMode = 'days';

  @observable
  chartLegendsDays = [
    moment()
      .subtract(3, 'days')
      .format('dddd'),
    moment()
      .subtract(2, 'days')
      .format('dddd'),
    'Yday',
    'Today'
  ];

  @observable
  chartLegendsWeeks = [
    `week ${moment()
      .subtract(3, 'weeks')
      .week()}`,
    `week ${moment()
      .subtract(2, 'weeks')
      .week()}`,
    'Last week',
    'This week'
  ];

  @observable
  chartLegendsMonths = [
    moment()
      .subtract(3, 'months')
      .format('MMMM'),
    moment()
      .subtract(2, 'months')
      .format('MMMM'),
    'Last month',
    'This month'
  ];

  saveReturnUserToken = () => {
    AsyncStorage.setItem('token', 'true');
  };

  changeMode = mode => {
    this.chartMode = mode;
  };

  getChartLegends = () => {
    switch (this.chartMode) {
      case 'days':
        return this.chartLegendsDays;
      case 'weeks':
        return this.chartLegendsWeeks;
      case 'months':
        return this.chartLegendsMonths;
      default:
        return this.chartLegendsDays;
    }
  };

  setGoal = (key, item) => {
    this.goal[key] = item;
    console.log(this.goal.times);
  };

  addEvent = event => this.events.push(event);

  resetEvents = () => (this.events = []);

  getEventsDays = minus => {
    const result = this.events.slice().filter(
      event =>
        event.date ===
        moment()
          .subtract(minus, 'days')
          .format('YYYYMMDD')
    );
    return result.slice().length;
  };

  getEventsWeeks = minus => {
    const result = this.events.slice().filter(
      event =>
        event.week ===
        moment()
          .subtract(minus, 'weeks')
          .week()
    );
    return result.slice().length;
  };

  getEventsMonths = minus => {
    const result = this.events.slice().filter(
      event =>
        event.month ===
        moment()
          .subtract(minus, 'months')
          .format('MMM')
    );
    console.log('result.slice().length', result.slice().length);
    return result.slice().length;
  };
}

const hydrate = create({
  storage: AsyncStorage, // or AsyncStorage in react-native.
  // default: localStorage
  jsonify: true // if you use AsyncStorage, here shoud be true
  // default: true
});

const store = new Store();

export default store;

hydrate('events', store).then(() => console.log('observable events hydrated'));
