import React, { Component } from "react";
import { connect } from "react-redux";
import Comment from "../components/Comment";
import withStyles from "@material-ui/core/styles/withStyles";
import { addComment } from "../redux/actions/dataActions";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    margin: "20px auto 20px auto",
  },
  button: {
    marginTop: 20,
    marginRight: 30,
    position: "relative",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
  progress: {
    position: "absolute",
  },
};
export class feedbacks extends Component {
  state = {
    newComment: "",
    adding: false,
  };
  handleAdd = (event) => {
    this.setState({
      adding: true,
    });
  };
  handleChange = (event) => {
    this.setState({
      newComment: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.newComment) {
      this.props.addComment(this.state.newComment, this.props.course);
      this.setState({
        adding: false,
        errors: "",
        newComment: "",
      });
    } else {
      this.setState({
        errors: "Empty comment",
      });
    }
  };
  handleCancel = () => {
    this.setState({ adding: false });
  };
  render() {
    const { authenticated } = this.props.user;
    const { classes, course, comments } = this.props;
    const newFeedbackButton = !authenticated ? (
      <Link to="/login">
        <Button
          type="button"
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          LOGIN TO ADD NEW FEEDBACK
        </Button>
      </Link>
    ) : (
      <Button
        type="button"
        variant="contained"
        color="secondary"
        className={classes.button}
        disabled={this.state.adding}
        onClick={this.handleAdd}
      >
        ADD NEW FEEDBACK
      </Button>
    );

    let renderedComments;
    if (comments.length !== 0) {
      renderedComments = comments.map((comment) => (
        <Comment key={comment.commentId} comment={comment} />
      ));
    } else {
      renderedComments = <p>no feedbacks yet</p>;
    }
    return (
      <div>
        <div>
          <h1>{course}</h1>
        </div>
        <div>{renderedComments}</div>
        {course && newFeedbackButton}
        {this.state.adding && (
          <form>
            <TextField
              id="entry"
              name="entry"
              type="text"
              label="Enter a new feedback..."
              className={classes.textField}
              helperText={this.state.errors}
              error={this.state.errors ? true : false}
              value={this.state.newCourse}
              onChange={this.handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.button}
              disabled={!this.state.adding}
              onClick={this.handleSubmit}
            >
              ADD
            </Button>
            <Button
              type="button"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={!this.state.adding}
              onClick={this.handleCancel}
            >
              CANCEL
            </Button>
          </form>
        )}
        <br />
        <br />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  course: state.data.course,
  comments: state.data.comments,
  user: state.user,
});
export default connect(mapStateToProps, { addComment })(
  withStyles(styles)(feedbacks)
);
