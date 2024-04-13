import React, { Component } from "react";

import { TextField, Button, Typography, Grid } from "@material-ui/core";

import { Link } from "react-router-dom";

export default class RoomJoinPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: "",
      error: "",
    };

    this.handleJoinButtonClick = this.handleJoinButtonClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(e) {
    this.setState({
      roomCode: e.target.value,
    });
  }

  handleJoinButtonClick(e) {
    console.log(this.state.roomCode);
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Join Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            error={this.state.error}
            label="Code"
            placeholder="Enter Room Code"
            helperText={this.state.error}
            value={this.state.roomCode}
            inputProps={{ style: { align: "center" } }}
            onChange={this.handleTextChange}
          ></TextField>
        </Grid>

        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleJoinButtonClick}
          >
            Join
          </Button>
        </Grid>

        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
}
