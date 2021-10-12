import React, { Component } from "react";
import { MyButton } from "../util/MyButton";
import { Link } from "react-router-dom";

// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// REdux
import { connect } from "react-redux";
import { likeCourse, unlikeCourse } from "../redux/actions/dataActions";

export class LikeButton extends Component {
  likedCourse = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.courseToProfessionId === this.props.courseToProfessionId
      )
    ) {
      return true;
    } else {
      return false;
    }
  };
  likeCourse = () => {
    this.props.likeCourse(this.props.courseToProfessionId);
  };
  unlikeCourse = () => {
    this.props.unlikeCourse(this.props.courseToProfessionId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedCourse() ? (
      <MyButton tip="Undo like" onClick={this.unlikeCourse}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton onClick={this.likeCourse} tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

const mapActionsToProps = {
  likeCourse,
  unlikeCourse,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
