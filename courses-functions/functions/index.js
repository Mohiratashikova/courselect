const functions = require("firebase-functions");
const db = require("./util/admin");
const app = require("express")();
const FBAuth = require("./util/fbAuth");
const cors = require("cors");
app.use(cors());

const { postOneComment, deleteComment } = require("./handlers/comments");
const { signup, login, getAuthenticatedUser } = require("./handlers/users");
const { postProfession, getProfessions } = require("./handlers/profession");
const {
  getCourses,
  getCourse,
  likeCourse,
  unlikeCourse,
  postCourseForProfession,
  getLikes,
} = require("./handlers/courses");

// feedback routes
app.get("/courseToProfession", getCourse);
app.get("/courses", getCourses);

app.post("/course/comment", FBAuth, postOneComment);
app.delete("/comment/:commentId", FBAuth, deleteComment);
app.get("/course/:courseToProfessionId/like", FBAuth, likeCourse);
app.get("/course/:courseToProfessionId/unlike", FBAuth, unlikeCourse);
app.post("/profession", postProfession);
app.get("/professions", getProfessions);
app.post("/profession/course", postCourseForProfession);
app.get("/likes", getLikes);
//users routes
app.post("/signup", signup);
app.post("/login", login);
app.get("/user", FBAuth, getAuthenticatedUser);

exports.api = functions.https.onRequest(app);
