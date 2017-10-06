import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class Notification extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      notifications: [
        {
          key: 1,
          user: 'demo',
          text: 'hello'
        },
        {
          key: 2,
          user: 'demo',
          text: 'what is up'
        }
      ],
      lessons: [],
      favoriteLessons: []
    };
  }

  componentDidMount() {
    var currentUser = window.localStorage.getItem('username');

    this.props.getLessons()
    .then((unfilteredLessons) => {
      return {
        lessons: unfilteredLessons.filter(lsn => this.props.user._id === lsn.userRef),
        favoriteLessons: unfilteredLessons.filter(lsn => lsn.userLikes.indexOf(this.props.user.username) >= 0)
      }
    })
    .then((lesson) => this.setState({lessons: lesson.lessons, favoriteLessons: lesson.favoriteLessons}))
    .then(() => {
      console.log('lessons', this.state.lessons);
      console.log('favoriteLessons', this.state.favoriteLessons);
      var notifications = [];
      for (var i = 0; i < this.state.lessons.length; i++) {
        var lesson = this.state.lessons[i];
        for (var j = 0; j < lesson.comments.length; j++) {
          var comment = lesson.comments[j];
          if (comment.user != currentUser) {
            var notification = {
              lesson: lesson.name,
              user: comment.user,
              key: comment.key,
              lessonId: lesson._id
            }
            notifications.push(notification);
            break;
          }
        }
      }
      this.setState({
        notifications: notifications
      });
      console.log('notifications', notifications);
    })
    .catch((err) => console.log('Error! ', err));
  }

  createNotifications(notification) {
    var day = moment(notification.key);
    var currentUser = window.localStorage.getItem('username');

    return (
      <li key={notification.key}>
        user {notification.user} commented on your lesson {notification.lesson} on {day._d.toString().slice(0,11)}
        {' '}<Link to={'/lesson/' + notification.lessonId}>
          <Button bsStyle="primary" bsSize="small">View Lesson</Button>
        </Link>
      </li>
    )
  }

  render() {
    var notificationEntries = this.state.notifications;
    var listNotifications = [].concat(notificationEntries).sort((a,b) => {
      return a.key - b.key
    }).reverse().map(this.createNotifications);

    return(
      <div>
        <h2>Notification</h2>
        <ul className="theNotifications">
          {listNotifications}
        </ul>
      </div>
    )
  }
};

export default Notification;
