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
    this.addDiv(this.getAttribute("username"));
    this.addDiv(this.getAttribute("last"));
    this.addDiv(this.getAttribute("ip"));
  }

  addDiv(content) {
    const newDiv = document.createElement("div");

    newDiv.innerHTML = content;
    this.appendChild(newDiv);
  }
}
customElements.define("user-li", UserLi, { extends: "li" });
customElements.define("user-list", UserList, { extends: "ul" });

export {
  UserLi,
  UserList
};