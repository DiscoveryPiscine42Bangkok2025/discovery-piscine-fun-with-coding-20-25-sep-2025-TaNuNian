$(document).ready(function() {
  let saved = getCookie("todos");
  if (saved) {
    let todos = JSON.parse(saved);
    todos.forEach(todo => addTodo(todo));
  }

  $("#new").on("click", function() {
    let text = prompt("Enter a new TO DO:");
    if (text && text.trim() !== "") {
      addTodo(text.trim(), true);
    }
  });

  function addTodo(text, save = false) {
    let $ftList = $("#ft_list");
    let $div = $("<div>").text(text);

    $div.on("click", function() {
      if (confirm("Do you really want to delete this TO DO?")) {
        $div.remove();
        updateCookie();
      }
    });

    $ftList.prepend($div);

    if (save) updateCookie();
  }

  function updateCookie() {
    let todos = [];
    $("#ft_list div").each(function() {
      todos.push($(this).text());
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
});
