import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfessions, addProfession } from "../redux/actions/dataActions";
import withStyles from "@material-ui/core/styles/withStyles";
import Profession from "./Profession";
import { Grid, TextField, Button } from "@material-ui/core";

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
export class Search extends Component {
  state = {
    entry: "",
    newProfession: "",
    adding: false,
  };
  componentDidMount() {
    this.props.getProfessions();
  }
  handleSubmit = (event) => {
    event.preventDefault();
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleAdd = (event) => {
    this.setState({
      adding: true,
    });
  };
  handleCreate = (event) => {
    this.setState({
      newProfession: event.target.value,
    });
  };
  handleNewSubmit = (event) => {
    event.preventDefault();
    if (
      this.props.data.professions.some(
        (profession) =>
          profession.professionName.toLowerCase() ===
          this.state.newProfession.toLowerCase()
      )
    ) {
      this.setState({
        errors: "Profession already exists",
      });
    } else if (this.state.newProfession === "") {
      this.setState({
        errors: "Invalid input",
      });
    } else {
      this.props.addProfession(this.state.newProfession);
      this.setState({
        adding: false,
        newProfession: "",
        errors: "",
      });
    }
  };
  handleCancel = () => {
    this.setState({ adding: false });
  };
  render() {
    const { professions, loading } = this.props.data;
    const { classes } = this.props;
    let professionsMarkup = !loading ? (
      professions.map(
        (profession) =>
          profession.professionName
            .toLowerCase()
            .includes(this.state.entry.toLowerCase()) && (
            <Profession key={profession.professionId} profession={profession} />
          )
      )
    ) : (
      <p>Loading all courses...</p>
    );

    return (
      <Grid container spacing={10}>
        <Grid item sm={2} xs={12} />
        <Grid item sm={8} xs={12}>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="search"
              name="entry"
              type="text"
              label="Search for a profession..."
              className={classes.textField}
              // helperText={errors.search}
              // error={errors.search ? true : false}
              value={this.state.entry}
              onChange={this.handleChange}
              fullWidth
            />
          </form>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            className={classes.button}
            disabled={this.state.adding}
            onClick={this.handleAdd}
          >
            ADD NEW PROFESSION
            <br />
          </Button>
          <br />
          {this.state.adding && (
            <form>
              <TextField
                id="search"
                name="entry"
                type="text"
                label="Enter a new profession..."
                className={classes.textField}
                helperText={this.state.errors}
                error={this.state.errors ? true : false}
                value={this.state.newProfession}
                onChange={this.handleCreate}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.button}
                disabled={!this.state.adding}
                onClick={this.handleNewSubmit}
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
          <div>{professionsMarkup}</div>
        </Grid>
        <Grid item sm={2} xs={12} />
      </Grid>
    );
    // return ;
  }
}

// Search.propTypes = {
//   getProfessions: PropTypes.func.isRequired,
//   data: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getProfessions, addProfession })(
  withStyles(styles)(Search)
);
