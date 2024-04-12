import React, { Component } from "react";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes_to_skip: 2,
      guest_can_pause: false,
      isHost: false,
      roomCode: "",
    };
  }

  getRoomDetails() {
    const { roomCode } = this.state;
    console.log("Fetching room details with roomCode:", roomCode);
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          votes_to_skip: data.votes_to_skip,
          guest_can_pause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  }

  componentDidMount() {
    const { roomCode } = this.props.params;
    this.setState({ roomCode }, () => {
      this.getRoomDetails();
    });
  }

  render() {
    return (
      <div>
        <h3>{this.state.roomCode}</h3>
        <p>Votes: {this.state.votes_to_skip.toString()}</p>
        <p>Guest can Pause: {this.state.guest_can_pause.toString()}</p>
        <p>isHost: {this.state.isHost.toString()}</p>
      </div>
    );
  }
}

export default withParams(Room);
