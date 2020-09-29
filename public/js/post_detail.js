// dom
function init() {
  const id = document.querySelector("#post-id");
  const body = document.querySelector("#editor-inline");
  if (body) {
    //   content editable
    body.contentEditable = true;
    CKEDITOR.disableAutoInline = true;
    const editor = CKEDITOR.inline("editor-inline", {
      extraPlugins: "font,justify",
      allowedContent: true,
      filebrowserBrowseUrl: "/editor/server-editor-image-browser"
    });

    // dom event
    // post update
    body.addEventListener("blur", e => {
      const body_data = editor.getData();

      // send server
      post_update(id.value, body_data);
    });
  }
}

setTimeout(init, 3000);

function go_back() {
  window.history.back();
}

// post update
function post_update(id, body) {
  const content = { body };
  // send server
  axios
    .put(`/editor/server-api-post-update-detail-page/?post_id=${id}`, content, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      let msg = "";
      if (res.data.message) {
        msg = res.data.message;
      }
      M.toast({ html: msg });
    })
    .catch(err => {
      let msg = "Server Error";
      if (err.response.data.message) {
        msg = err.response.data.message;
      }

      M.toast({ html: msg });
      M.toast({ html: err.response.statusText });
    });
}

// toTop
function toTop() {
  // let par = window.scrollY / 100;
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth"
  });
}
