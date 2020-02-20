exports.sendApiEndpoints = (req, res, next) => {
  const option = {
    root: "./"
  };
  res.sendFile("endpoints.json", option, err => {
    next(err);
  });
};
