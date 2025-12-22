module.exports = (req, res) => {
  res.status(200).json({ 
    message: 'Char API endpoint works!',
    query: req.query
  });
};