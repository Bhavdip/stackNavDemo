import React, { Component } from 'react';

export default class DataManager {
  state = {
    count: 0
  };
  constructor(props) {
    super(props);
  }

  addOneNumber() {
    alert(this.state.count);
    this.state.count = this.state.count + 1;
  }

  removeOneNumber() {
    var n = this.state.count;
    if (n > 0) {
      n = n - 1;
    }
  }

  getCountValue() {
    return this.state.count;
  }
}
