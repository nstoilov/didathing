import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react';
import Picker from 'react-native-wheel-picker';
import store from '../mobx/Store';

const PickerItem = Picker.Item;

@observer
class WheelPicker extends Component {
  state = {
    selectedItem: 0,
    itemList: ['0', '1', '2']
  };

  onPickerSelect(index) {
    this.setState({
      selectedItem: index
    });
    store.setGoal('times', index);
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
          style={{ width: 50, height: 90 }}
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

export default WheelPicker;
