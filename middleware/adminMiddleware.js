module.exports = (req, res, next) => {
  try {
    // check if user is logged in, if not then show matching error
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: 'Not logged in' });
    }

    // check if user is Admin
    if (req.session.isAdmin === true) {
      return next();
    }

    // if user is not admin, deny access, and show matching error
    return res.status(403).json({ error: 'Access denied: Admins only' });
  } catch (err) {
    console.error('Admin middleware error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};