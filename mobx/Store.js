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

  getChartEvents = () => {
    const result = [
      this.getEvents(3, 'days'),
      this.getEvents(2, 'days'),
      this.getEvents(1, 'days'),
      this.getEvents(0, 'days')
    ];
    return result;
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
        console.log(this.chartMode);
        return this.chartLegendsDays;
    }
  };

  setGoal = (key, item) => {
    this.goal[key] = item;
    console.log(this.goal.times);
  };

  addEvent = date => this.events.push(date);

  resetEvents = () => (this.events = []);

  /*
  getChartEvents = () => {
    switch (this.chartMode) {
      case 'days':
        return this.chartEventsDays;
      case 'weeks':
        console.log('this.chartEventsDays', this.chartEventsDays);
        return this.chartEventsDays;
      case 'months':
        console.log('this.chartEventsDays', this.chartEventsDays);
        return this.chartEventsDays;
      default:
        console.log('this.chartEventsDays', this.chartEventsDays);
        return this.chartEventsDays;
    }
  };
*/
  getEvents = (minus, period) => {
    const result = this.events.slice().filter(
      event =>
        event ===
        moment()
          .subtract(minus, period)
          .format('YYYYMMDD')
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
