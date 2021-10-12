import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AppIcon from "../../images/logo.svg";
import PropTypes from "prop-types";
import { MyButton } from "../../util/MyButton";
// import PostScream from "../scream/PostScream";

// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
// Icons
import { Home } from "@material-ui/icons";
import store from "../../redux/store";
import { logoutUser } from "../../redux/actions/userActions";
class Navbar extends Component {
  handleLogout = () => {
    store.dispatch(logoutUser());
  };

  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              {/* <PostScream /> */}
              <Link to="/">
                <MyButton tip="Home">
                  <Home />
                </MyButton>

                <Button
                  style={{
                    color: "#F4F6E6",
                  }}
                  onClick={this.handleLogout}
                >
                  Log out
                </Button>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/">
                <img src={AppIcon} alt="monkey" width="100px" />
              </Button>

              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
