const editor = CKEDITOR.replace("editor", {
  allowedContent: true,
  extraPlugins: "font,html5video,justify",
  uploadUrl: "/server/api/editor/fileupload",
  filebrowserBrowseUrl: "/server/editor/image/browser",
  filebrowserUploadUrl: "/server/api/editor/fileupload",
  filebrowserImageUploadUrl: "/server/api/editor/fileupload",
  imageUploadUrl: "/server/api/editor/fileupload"
});

// select init
// material js
M.AutoInit();

// file upload
editor.on("fileUploadRequest", async function(e) {
  // editor file upload
  // return boject
  // {
  //   "uploaded": 1,
  //   "fileName": "foo(2).jpg",
  //   "url": "/files/foo(2).jpg",
  //   "error": {
  //       "message": "A file with the same name already exists. The uploaded file was renamed to \"foo(2).jpg\"."
  //   }
  // }
  // {
  //   "uploaded": 0,
  //   "error": {
  //       "message": "The file is too big."
  //   }
  // }
  try {
    let fileLoader = e.data.fileLoader;
    var formData = new FormData();
    // append
    formData.append("file", fileLoader.file);
    console.log(fileLoader.uploadUrl);
    // send server
    let res = await axios.post(fileLoader.uploadUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    M.toast({ html: `${res.data.filename} uploaded` });
  } catch (err) {
    console.log(`file upload error: ${err}`);
    e.cancel();
  } finally {
    e.stop();
  }
});

function goback() {
  window.history.back();
}

// image_input_change
function image_input_change(e) {
  const title = document.querySelector("#title").value;
  if (title == "") return M.toast({ html: "Post Field Empty!!!" });
  let file = e.files[0];
  let type = file.type;
  // check imag file
  if (type.startsWith("image")) {
    var formData = new FormData();
    formData.append("image", file);
    // send server
    axios
      .post(`/image-upload/?post_title=${title}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        const post_image = document.querySelector("#post-image");
        post_image.src = `/upload/images/${res.data}?t=${Math.random() * 10}`;
        //
        M.toast({ html: "Image Uploaded" });
      })
      .catch(err => {
        console.log(err.response);
        // M.toast({html:err.response.statusText})
      });
  }
}

// post update
function new_update() {
  const title = document.querySelector("#title").value;
  const body = editor.getData();
  const category_name = document.querySelector("#category_name").value;
  const content = { title, author: "unknown", body, category_name };
  // send server
  axios
    .post(`/dashboard/server-api-post-new`, content, {
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
      // success
      setTimeout(() => {
        window.location.href = "/dashboard/post-table";
      }, 2000);
    })
    .catch(err => {
      let msg = "Server Error";
      if (err.response.data.message) {
        msg = err.response.data.message;
      }

      M.toast({ html: msg });
      // M.toast({html:err.response.statusText})
    });
}

// window close prevent
window.onbeforeunload = () => {
  console.log("no back");
};
