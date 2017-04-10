/* eslint-disable class-methods-use-this */
// @flow
import electron from 'electron';
import React, { Component } from 'react';
import styles from './Tasks.css';

function timeStringToFloat(time) {
  const hoursMinutes = time.split(/[.:h]/);
  const hours = parseInt(hoursMinutes[0], 10);
  const minutes = parseInt(hoursMinutes[1], 10);
  const floatValue = hours + (minutes / 60);
  return floatValue;
}

function getTaskHeight(beginTime, endTime) {
  const duration = timeStringToFloat(endTime) - timeStringToFloat(beginTime);
  return duration * 200;
}

/* eslint-disable react/prop-types */
export default class Tasks extends Component {
  componentWillMount() {
    this.props.fetchTasks();
  }

  props: {
    fetchTasks: () => void,
    tasksList: {
      tasks: Array<Object>
      // loading: boolean
    }
  }

  handleLinkClick() {
    const shell = electron.shell;
    // open links externally by default
    shell.openExternal('https://call_to_action');
  }

  render() {
    const {
      tasks
    } = this.props.tasksList;
    return (
      <div className={styles.tasks}>
        {tasks.map((task, i) => {
          if (task.beginAtDate && task.beginAtTime && task.endAtDate && task.endAtTime) {
            return (<div
              className={styles.task}
              style={{
                top: `${timeStringToFloat(task.beginAtTime) * 200}px`,
                height: `${getTaskHeight(task.beginAtTime, task.endAtTime)}px`
              }}
            >
              <h3>{ task.name }</h3>
              <div>{ task.beginAt } - { task.endAt }</div>
              <div>
                <a href="#clickToAction" onClick={this.handleLinkClick}><i className="fa fa-external-link" aria-hidden="true" /> Open Hangout</a>
              </div>
            </div>);
          }
          return '';
        })}
      </div>
    );
  }
}
