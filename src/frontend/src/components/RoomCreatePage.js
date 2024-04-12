import React, { Component } from "react";

// Material Ui imports
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Link, useNavigate } from "react-router-dom";

const withNavigation = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
};

class RoomCreatePage extends Component {
  defaultVotes = 2;

  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: true,
      votesToSkip: this.defaultVotes,
    };
    this.handleCreateRoomButtonPressed =
      this.handleCreateRoomButtonPressed.bind(this);

    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    this.handleVotesToSkipChange = this.handleVotesToSkipChange.bind(this);
  }

  handleGuestCanPauseChange(e) {
    this.setState({
      guestCanPause: e.target.value === "true" ? true : false,
    });
  }

  handleVotesToSkipChange(e) {
    this.setState({
      votesToSkip: e.target.value,
    });
  }

  handleCreateRoomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.props.navigate("/room/" + data.code);
      });
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create New Room
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl component={"fieldset"}>
            <FormHelperText>
              <div align="center"> Guest Control of Playback State </div>
            </FormHelperText>

            <RadioGroup
              row
              defaultValue="true"
              onChange={this.handleGuestCanPauseChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />

              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="number"
              defaultValue={this.defaultVotes}
              inputProps={{ min: 1, style: { textAlign: "center" } }}
              onChange={this.handleVotesToSkipChange}
            />
            <FormHelperText>
              <div align="center">Votes To Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleCreateRoomButtonPressed}
          >
            Create Room
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

export default withNavigation(RoomCreatePage);
