const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const bcrypt = require("bcryptjs");
const os = require("os");

// editor image path
const image_path = path.join(__dirname, "../../public/upload/editor");
const post_image_path = path.join(__dirname, "../../public/upload/images");

function page_number_to_array(number, current) {
  let pages = [];
  let current_page = parseInt(current);

  for (let i = 1; i < number; i++) {
    pages.push(i);
  }
  if (current_page - 2 > 0) {
    pages = pages.slice(current_page - 3, current_page + 3);
  } else if (current_page - 1 > 0) {
    pages = pages.slice(current_page - 2, current_page + 3);
  } else {
    pages = pages.slice(current_page - 1, current_page + 3);
  }

  pages.push(number);
  return pages;
}

function remove_tag(html) {
  // let reg = new RegExp()
  html = html.replace(/<.*?>/gim, "");
  html = html.replace(/\&nbsp;?|\&hellip;|&quot;|&#39;|&rdquo;|&ldquo;/gm, "");
  html = html.substring(0, 400);
  return html;
}

function is_found_post_image(name) {
  try {
    let res = fs.existsSync(`${post_image_path}/${name}.jpg`);
    if (res) {
      return `/upload/images/${name}.jpg`;
    } else {
      return `/blog.png`;
    }
  } catch (error) {
    return `/blog.png`;
  }
}

function parse_date(time_str) {
  let date = new Date(time_str);

  return date.toLocaleString();
}

function get_editor_files() {
  let files = fs.readdirSync(image_path);
  let images = [];

  for (let file of files) {
    let id = file.replace(path.extname(file), "");
    let ext = mime.lookup(file);

    images.unshift({ id: id, name: file, ext });
  }
  return images;
}

// image file remover
function file_remover(name, path) {
  try {
    fs.unlinkSync(`${path}/${name}`);
  } catch (err) {
    console.log(`file remove error ${err}`);
  }
}

// password
function password_hash(password) {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  return hash;
}

module.exports = {
  page_number_to_array,
  remove_tag,
  parse_date,
  get_editor_files,
  file_remover,
  password_hash,
  // post titile image
  is_found_post_image
};
