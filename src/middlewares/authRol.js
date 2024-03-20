export const authorizeUser = (req, res, next) => {
  const { role } = req.user;

  if (role === "user") {
    next();
  } else {
    res.status(403).json({ message: "Acceso no autorizado" });
  }
};

export const authorizeAdmin = (req, res, next) => {
  const { role } = req.user; 

  if (role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Acceso no autorizado" });
  }
};
