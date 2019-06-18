module.exports = (req, res, next) => {
    console.log(req.session.user)
    if (req.session && req.session.user) {
      next();   
    } else {
      res.status(400).json({ message: 'No credentials provided' });
    }
  };