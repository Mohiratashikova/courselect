import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";

// Redux
import { connect } from "react-redux";
import { setProfession } from "../redux/actions/dataActions";
const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
    cursor: "pointer",
  },
};

class Profession extends Component {
  handleProfession = (event) => {
    const name = event.target.innerHTML;
    this.props.setProfession(name);
    this.props.history.push("/courses");
  };
  render() {
    const {
      classes,
      profession: { professionName },
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            color="primary"
            onClick={this.handleProfession}
          >
            {professionName}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

Profession.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(
  connect(mapStateToProps, { setProfession })(withStyles(styles)(Profession))
);
