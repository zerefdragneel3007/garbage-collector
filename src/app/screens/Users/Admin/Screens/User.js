import React, { Component } from "react";
import { View, Text, StyleSheet, Picker, ScrollView } from "react-native";
import { Header, Avatar, Input, Button } from "react-native-elements";

import { connect } from "react-redux";

import {
  updateType,
  deleteSingleWorkerAndUser
} from "../../../../NewFirebase/Admin/WorkersUsers";

const back = "arrow-back";
const check = "check";
const edit = "edit";

class User extends Component {
  state = {
    headerLeftIcon: back,
    headerRightIcon: edit,
    User: null
  };
  componentWillMount() {
    let User = this.props.navigation.getParam("User", null);
    if (User != null) {
      this.setState({ User: User }, () => {
        console.log(this.state.User);
      });
    }
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Header
          placement="center"
          backgroundColor="white"
          leftComponent={{
            icon: this.state.headerLeftIcon,
            onPress: () => {
              this.props.navigation.goBack();
            }
          }}
          centerComponent={
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Avatar
                rounded
                source={{ uri: this.state.User.profile_picture }}
                size={80}
              />
              <Text style={{ padding: 8, fontSize: 16 }}>
                {this.state.User.full_name}
              </Text>
            </View>
          }
          containerStyle={styles.headerContainerStyle}
          statusBarProps={styles.statusBarProps}
        />
        <View style={styles.details}>
          <Input
            editable={false}
            value={this.state.User.first_name}
            label="First Name"
            inputContainerStyle={styles.input}
          />
          <Input
            editable={false}
            value={this.state.User.last_name}
            label="Last Name"
            inputContainerStyle={styles.input}
          />
          <Input
            editable={false}
            value={this.state.User.gmail}
            label="Email"
            inputContainerStyle={styles.input}
          />
          <Input
            editable={false}
            value={this.state.User.city}
            label="City"
            inputContainerStyle={styles.input}
          />
          <Input
            editable={false}
            value={new Date(this.state.User.created_at).toUTCString()}
            label="Created At"
            inputContainerStyle={styles.input}
          />
          <Input
            editable={false}
            value={new Date(this.state.User.last_logged_in).toUTCString()}
            label="Last Logged In"
            inputContainerStyle={styles.input}
          />

          {this.pickers()}
        </View>
        <Button
          title="Delete"
          style={{ padding: 10, color: "white" }}
          containerStyle={{ margin: 8 }}
          disabled={this.state.User.su ? true : false}
          buttonStyle={{ backgroundColor: "red" }}
          onPress={() => {
            deleteSingleWorkerAndUser(this.props, this.state.User);
          }}
        />
      </ScrollView>
    );
  }
  pickers = () => {
    if (this.state.User.su) {
      return (
        <Input
          label="User Type"
          inputContainerStyle={styles.input}
          inputComponent={Picker}
          selectedValue={this.state.User.user_type}
          mode="dropdown"
          onValueChange={(itemValue, itemIndex) => {
            if (itemValue != this.state.User.user_type) {
              this.setState({
                User: { ...this.state.User, user_type: itemValue }
              });
              updateType(this.props, this.state.User, itemValue);
            }
          }}
        >
          <Picker.Item value="Admin" label="Admin" />
        </Input>
      );
    } else {
      return (
        <Input
          label="User Type"
          inputContainerStyle={styles.input}
          inputComponent={Picker}
          selectedValue={this.state.User.user_type}
          mode="dropdown"
          onValueChange={(itemValue, itemIndex) => {
            if (itemValue != this.state.User.user_type) {
              this.setState({
                User: { ...this.state.User, user_type: itemValue }
              });
              updateType(this.props, this.state.User, itemValue);
            }
          }}
        >
          <Picker.Item value="User" label="User" />
          <Picker.Item value="Worker" label="Worker" />
          <Picker.Item value="Admin" label="Admin" />
        </Input>
      );
    }
  };
}

const mapStateToProps = state => {
  return {
    workersUsers: state.workersUsers
  };
};

export default connect(mapStateToProps)(User);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.05)"
  },
  headerContainerStyle: {
    elevation: 1,
    height: "auto",
    borderRadius: 4
  },
  statusBarProps: {
    backgroundColor: "rgba(0,0,0,0)"
  },
  details: {
    backgroundColor: "white",
    borderRadius: 4,
    padding: 8,
    margin: 8,
    elevation: 1,
    fontSize: 14
  },
  input: {
    borderBottomWidth: 0
  }
});
