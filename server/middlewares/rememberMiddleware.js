
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
function getUsers() {
  return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
}

module.exports = (req, res, next) => {
  if (req.cookies.userEmail && !req.session.user) {
    const users = getUsers();
    const user = users.find(u => u.email === req.cookies.userEmail);
    if (user) {
      req.session.user = {
        id: user.id,
        firstName: user.firstName,
        email: user.email,
        image: user.image
      };
    }
  }
  next();
};
