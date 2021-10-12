const { db } = require("../util/admin");
exports.getCourses = (req, res) => {
  db.collection("courseToProfession")
    .where("professionName", "==", req.query.professionName)
    .orderBy("likeCount", "desc")
    .get()
    .then((data) => {
      let courses = [];
      data.forEach((doc) => {
        courses.push({
          courseToProfessionId: doc.id,
          courseName: doc.data().courseName,
          likeCount: doc.data().likeCount,
        });
      });
      console.log(courses);
      return res.json(courses);
    })
    .catch((err) => console.error(err));
};

exports.getCourse = (req, res) => {
  allComments = [];
  db.collection("comments")
    .where("courseName", "==", req.query.courseName)
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      data.forEach((comment) => {
        allComments.push({
          body: comment.data().body,
          createdAt: comment.data().createdAt,
          userHandle: comment.data().userHandle,
          commentId: comment.id,
          courseName: req.body.courseName,
        });
      });
      return res.json({ allComments });
    })
    .catch((err) => {
      res.status(404).json({ error: "no such course for profession" });
    });
};

exports.likeCourse = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("userHandle", "==", req.user.handle)
    .where("courseToProfessionId", "==", req.params.courseToProfessionId)
    .limit(1);
  const courseDocument = db.doc(
    `/courseToProfession/${req.params.courseToProfessionId}`
  );
  let courseData;
  courseDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        courseData = doc.data();
        courseData.courseToProfessionId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("likes")
          .add({
            courseToProfessionId: req.params.courseToProfessionId,
            userHandle: req.user.handle,
          })
          .then(() => {
            courseData.likeCount++;
            return courseDocument.update({
              likeCount: courseData.likeCount,
            });
          })
          .then(() => {
            return res.json(courseData);
          });
      } else {
        return res
          .status(400)
          .json({ error: "course for this profession already liked" });
      }
    })
    .catch(() => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.unlikeCourse = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("userHandle", "==", req.user.handle)
    .where("courseToProfessionId", "==", req.params.courseToProfessionId)
    .limit(1);
  const courseDocument = db.doc(
    `/courseToProfession/${req.params.courseToProfessionId}`
  );
  let courseData;
  courseDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        courseData = doc.data();
        courseData.courseToProfessionId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res
          .status(400)
          .json({ error: "course for profession not liked" });
      } else {
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            courseData.likeCount--;
            return courseDocument.update({
              likeCount: courseData.likeCount,
            });
          })
          .then(() => {
            return res.json(courseData);
          });
      }
    })
    .catch(() => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.postCourseForProfession = (req, res) => {
  if (req.body.name.trim() === "") {
    return res.status(400).json({ body: "Name must not be empty" });
  }

  const newCourseToProfession = {
    courseName: req.body.name,
    likeCount: 0,
    professionName: req.body.professionName,
  };

  db.collection("courseToProfession")
    .add(newCourseToProfession)
    .then((doc) => {
      const resCourse = newCourseToProfession;
      resCourse.courseToProfessionId = doc.id;
      return res.json(resCourse);
    })

    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "sth went wrong" });
    });
};

exports.getLikes = (req, res) => {
  db.collection("likes")
    .get()
    .then((data) => {
      let likes = [];
      data.forEach((like) => {
        console.log(like.id, "=>", like.data().userHandle);
        // likes.id = like.id;
        likes.push({
          userHandle: like.data().userHandle,
          courseToProfessionId: like.data().courseToProfessionId,
          likeId: like.id,
        });
      });

      return res.json(likes);
    })
    .catch((err) => {
      return res.status(404).json({ error: err.data });
    });
};
