import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListGroupItem, Header, Button } from 'react-bootstrap';
import { ListGroup, DropdownButton, ButtonGroup, MenuItem } from 'react-bootstrap';
import LessonPreviewContainer from './Lesson/LessonPreviewContainer';
import LessonPreview from './Lesson/LessonPreview';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: []
    }
    this.getLessons = this.getLessons.bind(this);
    this.deleteLesson = this.deleteLesson.bind(this);
  }

  getLessons() {
    return fetch('/lessons', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    })
    .then((res) => res.json())
    .then((unfilteredLessons) => {
      console.log('not filtered: ', this.props.user);
      return unfilteredLessons.filter(lsn => this.props.user.lessons.indexOf(lsn._id) >= 0)
    })
    .then((lessons) => this.setState({lessons}))
    .catch((err) => console.log('Error getting lessons', err));
  }

  deleteLesson(lessonId) {
    return fetch('/lessons/' + lessonId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    })
    .then((res) => res.send(res))
    .catch((err) => console.log('Error deleting lessons', err));
  }

  componentDidMount() {
    this.getLessons();
  }

  render() {
    return (
      <ListGroup>
        <ListGroupItem>Username: { this.props.user.username || 'no username!' }</ListGroupItem>
        <ListGroupItem>Favorite Lessons: { this.props.user.favorites || 'no favorite lessons!' } </ListGroupItem>
        <ListGroupItem>
          <ButtonGroup vertical block>
            <DropdownButton title="Your Lessons:" id="Your Lessons">
              <MenuItem key={ this.props.user._id }>
                { this.state.lessons.length === 0 ? 'You Have No Lessons!' :
                  (this.state.lessons.map((lesson, i) => 
                    <div key={ lesson._id }>
                    {lesson.description || 'no description'} 
                    <Link to={'/lesson/' + lesson._id}>
                      <Button bsStyle="primary" bsSize="small" block>View Lesson</Button>
                    </Link>
                    <Button bsStyle="primary" bsSize="small" onClick={ () => this.deleteLesson(lesson._id) } block>Delete Lesson</Button>
                    </div>
                  )
                )}
              </MenuItem> 
            </DropdownButton>
          </ButtonGroup>
        </ListGroupItem>
      </ListGroup>
    );
  } 
}

export default User;
// {this.state.lessons.length > 0 ? (<LessonPreviewContainer lessons={ this.state.lessons }/>) : '' }