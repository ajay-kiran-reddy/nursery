const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password.length < 6 ? false : true;
};

function formatDate(date) {
  var d = new Date(date);
  var date_format_str =
    d.getFullYear().toString() +
    "/" +
    ((d.getMonth() + 1).toString().length === 2
      ? (d.getMonth() + 1).toString()
      : "0" + (d.getMonth() + 1).toString()) +
    "/" +
    (d.getDate().toString().length === 2
      ? d.getDate().toString()
      : "0" + d.getDate().toString()) +
    " " +
    (d.getHours().toString().length === 2
      ? d.getHours().toString()
      : "0" + d.getHours().toString()) +
    ":" +
    ((parseInt(d.getMinutes() / 5) * 5).toString().length === 2
      ? (parseInt(d.getMinutes() / 5) * 5).toString()
      : "0" + (parseInt(d.getMinutes() / 5) * 5).toString()) +
    ":00";

  return date_format_str;
}

export { validateEmail, validatePassword, formatDate };
