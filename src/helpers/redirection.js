export const isDesigner = (req, res, next) => {
  if (req.user.idrol == 2) {
    return next();
  }
  res.redirect("/home");
};
export const isAdmin = (req, res, next) => {
  if (req.user.idrol == 1) {
    return next();
  }
  res.redirect("/home");
};
export const isJefatura = (req, res, next) => {
  if (req.user.idrol == 3) {
    return next();
  }
  res.redirect("/home");
};
export const isStore = (req, res, next) => {
  if (req.user.idrol == 4) {
    return next();
  }
  res.redirect("/home");
};
