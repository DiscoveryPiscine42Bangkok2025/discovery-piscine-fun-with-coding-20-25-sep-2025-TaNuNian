window.onload = function() {
  let saved = getCookie("todos");
  if (saved) {
    let todos = JSON.parse(saved);
    todos.forEach(todo => addTodo(todo));
  }
};

document.getElementById("new").addEventListener("click", function() {
  let text = prompt("Enter a new TO DO:");
  if (text && text.trim() !== "") {
    addTodo(text.trim(), true);
  }
});

function addTodo(text, save = false) {
  let ftList = document.getElementById("ft_list");

  let div = document.createElement("div");
  div.innerText = text;

  div.addEventListener("click", function() {
    if (confirm("Do you really want to delete this TO DO?")) {
      ftList.removeChild(div);
      updateCookie();
    }
  });

  if (ftList.firstChild) {
    ftList.insertBefore(div, ftList.firstChild);
  } else {
    ftList.appendChild(div);
  }

  if (save) updateCookie();
}

function updateCookie() {
  let todos = [];
  document.querySelectorAll("#ft_list div").forEach(div => {
    todos.push(div.innerText);
  });
  setCookie("todos", JSON.stringify(todos), 7);
}

function setCookie(name, value, days) {
  let d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  let cname = name + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}
