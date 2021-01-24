export class User {
  static options = (data) => ({
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data)
  });

  static fetchAll(username, password) {
    const data = {
      action: "getAll",
      username,
      password
    };
    return fetch("/api/user.php", User.options(data));
  }
  static fetchUser(username, password, searchUser) {
    const data = {
      action: "getUser",
      username,
      password,
      searchUser
    };
    return fetch("/api/user.php", User.options(data));
  }

}