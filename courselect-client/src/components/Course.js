import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import LikeButton from "./LikeButton";
// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

// Redux
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { searchComments } from "../redux/actions/dataActions";
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
  },
};

class Course extends Component {
  handleCourse = () => {
    this.props.searchComments(this.props.course.courseName);
    this.props.history.push("/feedbacks");
  };

  render() {
    const {
      classes,
      course: { courseToProfessionId, courseName, likeCount },
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            color="primary"
            onClick={this.handleCourse}
            // component={Link}
            // to="/courses"
          >
            {courseName}
          </Typography>
          <Button
            type="button"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleCourse}
            // disabled={loading}
          >
            see feedbacks
          </Button>
          <LikeButton courseToProfessionId={courseToProfessionId} />
          <span>{likeCount} Likes</span>
        </CardContent>
      </Card>
    );
  }
}
const mapStateToProps = (state) => ({
  data: state.data,
});
export default withRouter(
  connect(mapStateToProps, { searchComments })(withStyles(styles)(Course))
);
