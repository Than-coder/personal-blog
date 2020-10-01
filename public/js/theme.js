const theme_button = document.querySelectorAll(".theme_button");
const body = document.querySelector("body");

function change_color_theme_button(name) {
  if (name == "dark") {
    // dark
    if (theme_button) {
      for (let btn of theme_button) {
        btn.innerText = "Dark Theme";
        btn.classList.add("black");
        btn.dataset.target = "light";
      }
    }
  } else {
    // light
    if (theme_button) {
      for (let btn of theme_button) {
        btn.innerText = "Light Theme";
        btn.classList.remove("black");
        btn.dataset.target = "dark";
      }
    }
  }
}

function theme_change(e) {
  let name = e.dataset.target;

  if (name == "dark") {
    // dark
    body.classList.add("dark-theme");
    change_color_theme_button(name);
    set_local("dark");
  } else {
    // light
    body.classList.remove("dark-theme");
    change_color_theme_button("light");
    set_local("light");
  }
}

function set_local(name) {
  window.localStorage.setItem("thme_name", name);
}

window.onload = () => {
  let name = window.localStorage.getItem("thme_name");
  if (name != null) {
    if (name == "dark") {
      // dark
      body.classList.add("dark-theme");
      change_color_theme_button(name);
    } else {
      // light
      body.classList.remove("dark-theme");
      change_color_theme_button("light");
    }
  }
};
