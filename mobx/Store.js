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
    'Yesterday',
    'Today'
  ];

  @observable
  modalVisible = false;

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
    moment()
      .subtract(1, 'months')
      .format('MMMM'),
    moment().format('MMMM')
  ];

  toggleModal = () => {
    this.modalVisible = !this.modalVisible;
  };

  saveReturnUserToken = () => {
    AsyncStorage.setItem('token', 'true');
  };

  setGoal = (key, item) => {
    this.goal[key] = item;
  };

  getGoal = () => {
    switch (this.chartMode) {
      case 'days':
        return Math.round(this.calculateGoalDays() * 10) / 10;
      case 'weeks':
        return Math.round(this.calculateGoalWeeks() * 10) / 10;
      case 'months':
        return Math.round(this.calculateGoalMonths() * 10) / 10;
      default:
        return Math.round(this.calculateGoalDays() * 10) / 10;
    }
  };

  getIndex = () => {
    switch (this.chartMode) {
      case 'days':
        return 0;
      case 'weeks':
        return 1;
      case 'months':
        return 2;
      default:
        return 0;
    }
  };

  calculateGoalDays = () => {
    switch (this.goal.per) {
      case 'day':
        return this.goal.times;
      case 'week':
        return this.goal.times / 7;
      case 'month':
        return this.goal.times / 30;
      case 'year':
        return this.goal.times / 365;
      default:
        return this.goal.times;
    }
  };

  calculateGoalWeeks = () => {
    switch (this.goal.per) {
      case 'day':
        return this.goal.times * 7;
      case 'week':
        return this.goal.times;
      case 'month':
        return this.goal.times / 4;
      case 'year':
        return this.goal.times / 52;
      default:
        return this.goal.times;
    }
  };

  calculateGoalMonths = () => {
    switch (this.goal.per) {
      case 'day':
        return this.goal.times * 30;
      case 'week':
        return this.goal.times * 4;
      case 'month':
        return this.goal.times;
      case 'year':
        return this.goal.times / 12;
      default:
        return this.goal.times;
    }
  };

  addEvent = event => this.events.push(event);

  clearEvents = () => (this.events = []);

  undoEvent = () => (this.events = this.events.slice(0, -1));

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
//hydrate('token', store).then(() => console.log('observable token hydrated'));
