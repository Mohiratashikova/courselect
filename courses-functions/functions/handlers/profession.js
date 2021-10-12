const { db } = require("../util/admin");
exports.postProfession = (req, res) => {
  if (req.body.name.trim() === "") {
    return res.status(400).json({ body: "Name must not be empty" });
  }

  const newProfession = {
    name: req.body.name,
  };
  db.collection("profession")
    .add(newProfession)
    .then((doc) => {
      const resProfession = newProfession;
      resProfession.professionId = doc.id;
      return res.json(resProfession);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "sth went wrong" });
    });
};
exports.getProfessions = (req, res) => {
  let allProfessions = [];
  db.collection("profession")
    .orderBy("name")
    .get()
    .then((data) => {
      data.forEach((prof) => {
        allProfessions.push({
          professionId: prof.id,
          professionName: prof.data().name,
        });
      });
      return res.json(allProfessions);
    })
    .catch((err) => {
      return res.status(500).json({ error: err.data });
    });
};
