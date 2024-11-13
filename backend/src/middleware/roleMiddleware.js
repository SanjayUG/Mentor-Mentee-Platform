export const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
      const user = req.user; // Assuming `authMiddleware` adds the user info to req.user
  
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      if (user.role !== requiredRole) {
        return res.status(403).json({ message: `Access restricted to ${requiredRole} users only` });
      }
  
      next();
    };
  };
  