import React, { Component } from "react";
import { connect } from "react-redux";
import Course from "../components/Course";
import withStyles from "@material-ui/core/styles/withStyles";
import { addCourse, setCourses } from "../redux/actions/dataActions";
import { TextField, Button } from "@material-ui/core";

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
export class courses extends Component {
  state = {
    newCourse: "",
    adding: false,
  };
  componentDidMount = () => {
    this.props.setCourses(this.props.professionName);
  };
  handleAdd = (event) => {
    this.setState({
      adding: true,
    });
  };
  handleChange = (event) => {
    this.setState({
      newCourse: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (
      !this.props.data.courses.some(
        (course) =>
          course.courseName.toLowerCase() === this.state.newCourse.toLowerCase()
      )
    ) {
      this.props.addCourse(
        this.state.newCourse,
        this.props.data.professionName
      );
      this.setState({
        adding: false,
        errors: "",
        newCourse: "",
      });
    } else {
      this.setState({
        errors: "course already exists",
      });
    }
  };
  handleCancel = () => {
    this.setState({ adding: false });
  };
  render() {
    const { classes } = this.props;
    const { professionName, courses } = this.props.data;
    let renderedCourse;

    if (courses.length !== 0) {
      renderedCourse = courses.map((course) => (
        <Course key={course.courseToProfessionId} course={course} />
      ));
    } else {
      renderedCourse = <p>no courses yet</p>;
    }
    return (
      <div>
        <div>
          <h1>{professionName}</h1>
        </div>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          className={classes.button}
          disabled={this.state.adding}
          onClick={this.handleAdd}
        >
          ADD NEW COURSE FOR THIS PROFESSION
        </Button>

        {this.state.adding && (
          <form>
            <TextField
              id="entry"
              name="entry"
              type="text"
              label="Enter a new course..."
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
        <div>{renderedCourse}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  professionName: state.data.professionName,
  data: state.data,
});
export default connect(mapStateToProps, { addCourse, setCourses })(
  withStyles(styles)(courses)
);
