const { db } = require("../util/admin");
exports.postOneComment = (req, res) => {
  if (req.body.body.trim() === "") {
    return res.status(400).json({ body: "Body must not be empty" });
  }

  const newComment = {
    body: req.body.body,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
    courseName: req.body.courseName,
  };

  db.collection("comments")
    .add(newComment)
    .then((doc) => {
      const resComment = newComment;
      resComment.commentId = doc.id;
      return res.json(resComment);
    })

    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "sth went wrong" });
    });
};

// delete a feedback
exports.deleteComment = (req, res) => {
  const document = db.doc(`/comments/${req.params.commentId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "comment not found" });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: "unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "comment deleted successfully" });
    })
    .catch((error) => {
      return res.status(500).json({ error: err.code });
    });
};
