export const authorizationMiddleware = (req, res, next) => {
    const userId = req.params.id;
    const currentUser = req.user; // User from auth middleware
  
    // Allow if current user is admin or is the same user being accessed
    if (currentUser.role === "admin" || currentUser.id === userId) {
      return next();
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  };
  