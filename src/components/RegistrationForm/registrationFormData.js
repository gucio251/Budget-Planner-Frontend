export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const names = {
  email: "email",
  password: "password",
  repeatedPassword: "repeatedPassword",
};

export const labels = {
  email: "E-mail address",
  password: "Password",
  repeatedPassword: "Confirm password",
};

export const types = {
  password: "password",
  text: "text"
}
