export const authorizeUser = (req, res, next) => {
  const { role } = req.user;

  if (role === "user") {
    res.status(403).json({ message: "Acceso no autorizado" });
  } else {
    next();
  }
};

export const authorizeAdmin = (req, res, next) => {
  const { role } = req.user; 

  if (role === "admin") {
    res.status(200).json({ message: "Autorizado" });
    next();
  } else {
    res.status(403).json({ message: "Acceso no autorizado" });
  }
};

export const authorizePremium = (req, res, next) => {
  const { role } = req.user; 

  if (role === "premium") {
    res.status(200).json({ message: "Autorizado" });
    next();
  } else {
    res.status(403).json({ message: "Acceso no autorizado" });
  }
};