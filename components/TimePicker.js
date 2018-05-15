import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react';
import Picker from 'react-native-wheel-picker';
import store from '../mobx/Store';

const PickerItem = Picker.Item;

@observer
class TimePicker extends Component {
  state = {
    selectedItem: 1,
    itemList: ['day', 'week', 'month', 'year']
  };

  onPickerSelect(index) {
    this.setState({
      selectedItem: index
    });
    store.update('per', this.state.itemList[index]);
  }

  onAddItem = () => {
    const name = 'name';
    if (this.state.itemList.indexOf(name) === -1) {
      this.state.itemList.push(name);
    }
    this.setState({
      selectedItem: this.state.itemList.indexOf(name)
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Picker
          style={{ width: 120, height: 90 }}
          selectedValue={this.state.selectedItem}
          itemStyle={{ color: 'black', fontSize: 30 }}
          onValueChange={index => this.onPickerSelect(index)}
        >
          {this.state.itemList.map((value, i) => (
            <PickerItem label={value} value={i} key={`key ${value}`} />
          ))}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
  }
});

export default TimePicker;
