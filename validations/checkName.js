const checkFirstName = (req, res, next) => {
  const { firstname } = req.body;
  if (firstname) {
    return next();
  } else {
    res.status(400).json({ error: "First name is required" });
  }
};

const checkLastName = (req, res, next) => {
  const { lastname } = req.body;
  if (lastname) {
    return next();
  } else {
    res.status(400).json({ error: "Last name is required" });
  }
};

module.exports = { checkFirstName, checkLastName };
