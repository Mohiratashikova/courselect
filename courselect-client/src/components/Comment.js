import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";

// Redux
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { deleteComment } from "../redux/actions/dataActions";
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
  button: {
    fontSize: 10,
  },
  body: {
    fontSize: 20,
    backgroundColor: "#F5F3F0",
    padding: "5px",
    marginBottom: "5px",
    boxShadow: "3px 3px 2px #eee",
  },
};

class Comment extends Component {
  handleDelete = () => {
    this.props.deleteComment(this.props.comment.commentId, this.props.course);
  };
  render() {
    const { credentials } = this.props.user;
    dayjs.extend(relativeTime);
    const {
      classes,
      comment: { body, createdAt, userHandle },
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography variant="h5" className={classes.body}>
            {body}
          </Typography>
          <Typography variant="body1" color="primary">
            author: {userHandle}
          </Typography>
          <Typography variant="body1" color="secondary">
            {dayjs(createdAt).fromNow()}
          </Typography>

          {credentials.handle === userHandle && (
            <Button
              type="button"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleDelete}
              // disabled={loading}
            >
              Delete feedback
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  course: state.data.course,
});

export default connect(mapStateToProps, { deleteComment })(
  withStyles(styles)(Comment)
);
