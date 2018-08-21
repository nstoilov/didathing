import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import { Button, ButtonGroup } from 'react-native-elements';
import moment from 'moment';
import Modal from 'react-native-modal';
import store from '../mobx/Store';
import Chart from '../components/Chart';

@observer
class ChartScreen extends Component {
  state = {
    selectedIndex: store.getIndex(),
    isModalVisible: false
  };

  onPressEdit = () => {
    this.props.navigation.navigate('edit');
  };

  onPressDidIt() {
    const event = {
      date: moment().format('YYYYMMDD'),
      week: moment().week(),
      month: moment().format('MMM')
    };
    store.addEvent(event);
  }

  onPressUndo() {
    store.undoEvent();
  }

  onModalConfirm = () => {
    store.clearEvents();
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  updateIndex = selectedIndex => {
    this.setState({ selectedIndex });
    switch (selectedIndex) {
      case 0:
        return store.changeMode('days');
      case 1:
        return store.changeMode('weeks');
      case 2:
        return store.changeMode('months');
      default:
        return store.changeMode('days');
    }
  };

  render() {
    const buttons = ['Days', 'Weeks', 'Months'];
    const { selectedIndex } = this.state;
    return (
      <View style={styles.modalStyle}>
        <Modal
          backdropOpacity={0.8}
          isVisible={this.state.isModalVisible}
          animationIn="bounceIn"
          animationOut="fadeOut"
          onBackdropPress={() => this.toggleModal()}
        >
          <View style={styles.modalStyle}>
            <Text style={styles.modalTitleStyle}>
              Are you sure you want to delete all data?
            </Text>
            <Button
              title="Yes"
              large
              color="white"
              buttonStyle={styles.buttonModalStyle}
              textStyle={{ fontWeight: 'bold', fontSize: 20 }}
              onPress={this.onModalConfirm}
            />
            <Button
              title="No"
              large
              color="white"
              buttonStyle={styles.buttonModalStyle}
              textStyle={{ fontWeight: 'bold', fontSize: 20 }}
              onPress={this.toggleModal}
            />
          </View>
        </Modal>

        <View style={styles.containerStyle}>
          <View style={styles.buttonsContainerTopStyle}>
            <Button
              title="Edit"
              color="white"
              buttonStyle={styles.buttonTopStyle}
              onPress={() => this.onPressEdit()}
            />
            <Button
              title="Clear All Data"
              color="white"
              buttonStyle={styles.buttonTopStyle}
              onPress={this.toggleModal}
            />
            <Button
              title="Undo"
              color="white"
              buttonStyle={styles.buttonTopStyle}
              onPress={() => this.onPressUndo()}
            />
          </View>
          <TouchableOpacity onPress={() => this.onPressEdit()}>
            <Text style={styles.titleStyle}>{store.goal.name}</Text>
          </TouchableOpacity>
          <Text style={styles.subtitleStyle}>
            {`Goal: ${store.getGoal()} per ${store.chartMode.slice(0, -1)}`}
          </Text>
          <Chart />
          <ButtonGroup
            containerStyle={styles.ButtonGroupContainerStyle}
            innerBorderStyle={{ width: 1, color: '#50D1CB' }}
            selectedButtonStyle={{ backgroundColor: '#50D1CB' }}
            selectedTextStyle={{ color: 'white', fontSize: 16 }}
            textStyle={{ fontSize: 15 }}
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
          />
          <View style={styles.buttonsContainerBottomStyle}>
            <Button
              title="Did it"
              large
              color="white"
              textStyle={{ fontWeight: 'bold', fontSize: 20 }}
              buttonStyle={styles.buttonBottomStyle}
              onPress={() => this.onPressDidIt()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  ButtonGroupContainerStyle: {
    height: 35,
    borderRadius: 20,
    borderColor: '#50D1CB',
    backgroundColor: 'white',
    marginLeft: 20,
    marginRight: 20
  },
  modalStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleStyle: {
    fontSize: 40,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10
  },
  modalTitleStyle: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10
  },
  subtitleStyle: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginBottom: 40
  },
  buttonsContainerTopStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  buttonsContainerBottomStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 10
  },
  buttonTopStyle: {
    backgroundColor: '#50D1CB',

    borderColor: '#5de2dc',
    paddingVertical: 3,
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10
  },
  buttonBottomStyle: {
    backgroundColor: '#e2b5ff',
    width: 300,
    height: 55,

    borderRadius: 30,
    marginBottom: 10,
    marginTop: 10
  },
  buttonModalStyle: {
    backgroundColor: '#50D1CB',
    width: 300,
    height: 55,

    borderRadius: 30,
    marginBottom: 10,
    marginTop: 10
  }
};

export default ChartScreen;
