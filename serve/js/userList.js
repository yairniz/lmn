import { User } from '../js/user.js';

Common.addCss("css/userList.css");

class UserList extends HTMLUListElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("connected");
    this.getList();
    this.interval = setInterval(this.getList, 3000);
  }

  disconnectedCallback() {
    clearInterval(this.interval);
  }

  getList = () => {
    const urlParams = new URLSearchParams(window.location.search);

    User.fetchAll(urlParams.get("username"), urlParams.get("password"))
    .then(response => response.json())
    .then(usersJson => {
      this.displayUsersList(usersJson);
    });
  }

  displayUsersList = (usersJson) => {
    const usersHTML = Object.keys(usersJson).map((username) => {
      const user = usersJson[username];

      return `<li is="user-li" username="${ username }" last="${ user.lt }" ip="${ user.ip }"></li>`;
    });
    this.innerHTML = `<li is="user-li" username="User" last="Last Login" ip="IP"></li>` + 
      usersHTML.join('');
  };
}
class UserLi extends HTMLLIElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.uDiv = this.addDiv(this.getAttribute("username"), "username");
    this.addDiv(this.getAttribute("last"));
    this.addDiv(this.getAttribute("ip"));

    this.uDiv.addEventListener("click", this.userClick);
  }

  disconnectedCallback() {
    this.uDiv.removeEventListener("click", this.userClick);
  }

  userClick = (e) => {
    const elm = e.target;
    const urlParams = new URLSearchParams(window.location.search);

    User.fetchUser(urlParams.get("username"), urlParams.get("password"), elm.innerHTML)
    .then(response => response.json())
    .then(userJson => {
      console.log(userJson);
      const popup = document.createElement("div");
      popup.innerHTML = `<div>Logins: ${ userJson.sl }</div><div>User Agent: ${ userJson.ua }</div>`;
      elm.appendChild(popup);
    });
  };

  addDiv(content, className) {
    const newDiv = document.createElement("div");

    if (className) {
      newDiv.className = className
    }
    newDiv.innerHTML = content;
    this.appendChild(newDiv);

    return newDiv;
  }
}
customElements.define("user-li", UserLi, { extends: "li" });
customElements.define("user-list", UserList, { extends: "ul" });

export {
  UserLi,
  UserList
};