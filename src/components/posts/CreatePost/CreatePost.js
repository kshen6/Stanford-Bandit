/* React */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Input,
  Col,
  Form,
  FormGroup,
  Label,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux';
import InputMask from 'react-input-mask';

/* Assets */
import { API } from 'aws-amplify';
import Loader from '../../ui/Loader/Loader';
import './CreatePost.css';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

class ConnectedCreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: null,
      subject: '',
      content: '',
      location: '',
      time: '',
      postType: 'Create new...',
      dropdownOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  validatePost() {
    return this.state.subject.length && this.state.content.length;
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  createPost(post) {
    return API.post('postapi', '/banditposts', {
      body: post
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });

    try {
      await this.createPost({
        postType: this.state.postType,
        subject: this.state.subject,
        content: this.state.content,
        location: this.state.location.length ? this.state.location : null,
        time: this.state.time.length ? this.state.time : null,
        author: this.props.user.preferred_name
      });
      window.location.reload();
    } catch (e) {
      alert(e.message);
    }

    this.setState({ loading: false });
  };

  handleDrop(postType) {
    this.setState({
      postType: postType
    });
    this.forceUpdate();
  }

  render() {
    return (
      <Form className="createPost" onSubmit={this.handleSubmit}>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle id="b-d-toggle" caret>
            {this.state.postType}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem disabled>Create new...</DropdownItem>
            <DropdownItem onClick={e => this.handleDrop('Post', e)}>
              Post
            </DropdownItem>
            <DropdownItem onClick={e => this.handleDrop('Concert', e)}>
              Concert
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {this.state.postType === 'Post' && (
          <div>
            <FormGroup row>
              <Label htmlFor="subject" sm={2}>
                Subject:
              </Label>
              <Col md={6}>
                <Input
                  type="text"
                  name="subject"
                  id="subject-input"
                  placeholder=""
                  value={this.state.subject}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="content" sm={2}>
                Content:
              </Label>
              <Col md={6}>
                <Input
                  type="textarea"
                  name="content"
                  id="content-input"
                  placeholder=""
                  value={this.state.content}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
          </div>
        )}
        {this.state.postType === 'Concert' && (
          <div>
            <FormGroup row>
              <Label htmlFor="concert" sm={2}>
                Concert Title:
              </Label>
              <Col md={6}>
                <Input
                  type="text"
                  name="subject"
                  id="concert-input"
                  placeholder=""
                  value={this.state.subject}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="description" sm={2}>
                Description:
              </Label>
              <Col md={6}>
                <Input
                  type="textarea"
                  name="content"
                  id="content-input"
                  placeholder=""
                  value={this.state.content}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="location" sm={2}>
                Location:
              </Label>
              <Col md={6}>
                <Input
                  type="textarea"
                  name="location"
                  id="location-input"
                  placeholder=""
                  value={this.state.location}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="time" sm={2}>
                Date and time:
              </Label>
              <Col md={6}>
                <InputMask
                  id="mask"
                  mask="M9/d9 M9:h9 tm"
                  formatChars={{
                    M: '[0-1]',
                    '9': '[0-9]',
                    d: '[0-3]',
                    h: '[0-5]',
                    t: '[aAPp]'
                  }}
                  alwaysShowMask
                  maskChar="-"
                  name="time"
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
          </div>
        )}
        <FormGroup check row>
          <Col id="l-row">
            <Loader
              disabled={!this.validatePost()}
              type="submit"
              isLoading={this.state.loading}
              text="Publish"
              loadingText="Publishing..."
            />
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

const CreatePost = connect(mapStateToProps)(ConnectedCreatePost);

export default withRouter(CreatePost);
