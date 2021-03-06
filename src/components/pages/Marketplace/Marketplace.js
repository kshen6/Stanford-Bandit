/* React, Redux */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';

/* Assets */
import { API } from 'aws-amplify';
import './Marketplace.css';
import InlineButton from '../../ui/InlineButton/InlineButton';

const mapStateToProps = state => {
  return {
    logged: state.logged
  };
};

function UserCard(props) {
  return (
    <div className="userCard">
      <h4>{props.user.preferred_name}</h4>
      <div className="row">
        <Col sm={3}>
          <h6>
            <i className="fa fa-home" /> | {props.user.programAndYear}
          </h6>
        </Col>
        <Col sm={3}>
          <h6>
            <i className="fa fa-university" /> | {props.user.residence}
          </h6>
        </Col>
      </div>
      <div className="row">
        <Col sm={3}>
          <p>
            <i className="fa fa-headphones" /> | {props.user.genres}
          </p>
        </Col>
        <Col sm={3}>
          <p>
            <i className="fa fa-music" /> | {props.user.instruments}
          </p>
        </Col>
      </div>
      <a>View {props.user.preferred_name + "'s"} profile</a>
    </div>
  );
}

class ConnectedMarketplace extends Component {
  constructor(props) {
    super(props);
    this.ensure = this.ensure.bind(this);
    this.state = {
      users: []
    };
  }

  async componentDidMount() {
    try {
      const users = await this.users();
      this.setState({ users });
    } catch (e) {
      console.log(e);
    }
  }

  users() {
    return API.get('userapi', '/banditusers');
  }

  ensureAuth() {
    return (
      <p>
        Please <InlineButton text="login" onClick={this.ensure} /> to view this
        content.
      </p>
    );
  }

  ensure() {
    this.props.history.push('auth');
  }

  render() {
    return (
      <div className="marketplace page">
        {!this.props.logged && this.ensureAuth()}
        {this.props.logged && (
          <div>
            <div id="content" />
            <h4>Musicians</h4>
            <Col>
              {this.state.users.map(user => (
                <UserCard key={user.userId} user={user} />
              ))}
            </Col>
          </div>
        )}
      </div>
    );
  }
}

const Marketplace = connect(mapStateToProps)(ConnectedMarketplace);

export default Marketplace;
