export class User {
  static fetchAll(username, password) {
    const data = {
      action: "getAll",
      username,
      password
    };
    return fetch("/api/user.php", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    });
  }
}