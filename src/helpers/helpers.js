export const isDesigner = (user) => {
  if (user != null) {
    if (user.idrol == 2) {
      return true;
    }
  } else {
    return false;
  }
};
export const isAdmin = (user) => {
  if (user != null) {
    if (user.idrol == 1) {
      return true;
    }
  } else {
    return false;
  }
};
export const isJefatura = (user) => {
  if (user != null) {
    if (user.idrol == 3) {
      return true;
    }
  } else {
    return false;
  }
};
export const isStore = (user) => {
  if (user != null) {
    if (user.idrol == 4) {
      return true;
    }
  } else {
    return false;
  }
};

export const getNameRols = (user) => {
  let name = "";
  if (user != null) {
    if (user.idrol == 1) {
      name = "ADMINISTRADOR";
    }
    if (user.idrol == 2) {
      name = "DISEÑADOR";
    }
    if (user.idrol == 3) {
      name = "JEFATURA";
    }
    if (user.idrol == 4) {
      name = "DESPACHO";
    }
  }

  return name;
};
