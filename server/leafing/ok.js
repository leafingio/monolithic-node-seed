module.exports = (req, data) => {
  req.response = {
    statusCode: 200,
    message: 'Success',
    data,
  };
};
