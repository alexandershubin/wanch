
  var link = document.querySelector(".button-link");
  var popup = document.querySelector(".modal-login");
  var close = document.querySelector(".modal-close");
  var login = popup.querySelector("[name=name]");
  var form = popup.querySelector("form");
  var password = popup.querySelector("[name=tel]");

  var isStorageSupport = true;
  var storage = "";

  try {
    storage = localStorage.getItem("name");
  } catch (err) {
    isStorageSupport = false;
  }

  link.addEventListener("click", function(evt) {
    evt.preventDefault();
    popup.classList.add("modal-show");
  });

  close.addEventListener("click", function(evt) {
    evt.preventDefault();
    popup.classList.remove("modal-show");
    popup.classList.remove("modal-error");
  });

  link.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.add("modal-show");
    if (storage) {
      name.value = storage;
      tel.focus();
    } else {
      name.focus();
    }
  });

  form.addEventListener("submit", function (evt) {
    if (!name.value || !tel.value) {
      evt.preventDefault();
      popup.classList.remove("modal-error");
      popup.offsetWidth = popup.offsetWidth;
      popup.classList.add("modal-error");
      console.log("Нужно Имя и телефон");
    } else {
    if (isStorageSupport) {
      localStorage.setItem("name", name.value);
      }
    }
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
    if (popup.classList.contains("modal-show")) {
      popup.classList.remove("modal-show");
      popup.classList.remove("modal-error");
      }
    }
  });
