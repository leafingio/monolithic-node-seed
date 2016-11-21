
exports.CreateController = (req, res, next)  => {
  if(!req.error) {
    // Haz cosas aqui
    req.response = req.body;
  };

  next();
};
