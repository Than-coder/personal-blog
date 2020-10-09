let fileChooseUrl = null;
let filename = null;

let tooltipped = document.querySelectorAll(".tooltipped");
let checkmarks = document.querySelectorAll(".checkmarks");
let choose_button = document.querySelector("#choose-button");
let video_tab_btn = document.querySelector("#video_tab_btn");
let image_tab_btn = document.querySelector("#image_tab_btn");
let video_tab = document.querySelector("#video-tab");
let image_tab = document.querySelector("#image-tab");

M.Tooltip.init(tooltipped);
// hide tab
function hide_tab(name) {
  if (name == "video") {
    // show img
    image_tab.style.display = "block";
    image_tab_btn.classList.add("teal");
    video_tab.style.display = "none";
    video_tab_btn.classList.remove("teal");
  } else if (name == "image") {
    // show video
    video_tab.style.display = "block";
    video_tab_btn.classList.add("teal");
    image_tab.style.display = "none";
    image_tab_btn.classList.remove("teal");
  } else if (name == "all") {
    video_tab.style.display = "none";
    video_tab_btn.classList.remove("teal");
    image_tab.style.display = "none";
    image_tab_btn.classList.remove("teal");
    // show file tab
  }
}
window.onload = () => {
  hide_tab("video");
  choose_button.style.display = "none";
};

// hide choose all
function hide_all_checkmarks() {
  for (let mark of checkmarks) {
    mark.classList.remove("choosed");
  }
}

// choose buttton click
function choose_button_click() {
  if (fileChooseUrl != null) {
    window.opener.CKEDITOR.tools.callFunction(1, fileChooseUrl);
    window.close();
  }
}

// choose blur
// window.addEventListener('click',e =>{
//     console.log(e.target.className)
// })

function chooseImage(e) {
  hide_all_checkmarks();
  e.previousElementSibling.classList.add("choosed");
  // file url
  fileChooseUrl = e.src;
  filename = e.dataset.name;
  // show choose button
  choose_button.style.display = "inline-block";
}

// file input change
function file_input(e) {
  let files = e.files;
  if (files.length == 0) return false;
  multiple_file_upload(files);
}

// file upload
async function multiple_file_upload(files) {
  try {
    let formData = new FormData();

    for (let file of files) {
      formData.append("files", file);
    }
    // send server
    let res = await axios.post("/editor/server-files-upload-api", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: upload_progress
    });
    // success
    M.toast({ html: res.data.message });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    console.log(error);
    if (error.response.statusText) {
      M.toast({ html: error.response.statusText });
    }
    if (error.response.data.message) {
      M.toast({ html: error.response.data.message });
    }
  }

  // send server
}

// file delete
async function delete_file() {
  try {
    if (filename == null) return false;
    // server
    let res = await axios.delete(
      `/editor/file-delete-api/?file_name=${filename}`
    );
    // success
    M.toast({ html: res.data.message });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    console.log(error);
    if (error.response.statusText) {
      M.toast({ html: error.response.statusText });
    }
    if (error.response.data.message) {
      M.toast({ html: error.response.data.message });
    }
  }
}

// file upload progress
function upload_progress(e) {
  let value = Math.floor((e.loaded / e.total) * 100);
  document.querySelector("#file-progress").style.width = `${value}%`;
}
