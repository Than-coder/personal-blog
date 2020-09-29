const multer = require("multer");
const path = require("path");
// common
const common = require('./common');

// upload folder path
const upload_image_dir = path.join(__dirname, "../../public/upload/images");

// multer
const storage = multer.diskStorage({
  destination: upload_image_dir,
  filename: (req, file, cb) => {
    if (req.query.post_title){
      let title = req.query.post_title
      let filename = `${title}.jpg`
      cb(null,filename)

    }else{
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
  }
});



const upload = multer({ storage }).single("image");

//////////////////////////////

function add_image_post(req, res) {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({err});
    } else {
      res.status(201).send(req.file.filename);
    }
  });
}


// editor browser
async function editor_get_image_browser(req,res){
  let files = [];
  try {
    let files = common.get_editor_files()
    // render
    res.render('editor/image_browser',{
      files
    })
  } catch (error) {
    res.status(400).send(error)
  }
}

// editor api
async function editor_get_image_api(req,res){
  try {
      let files = common.get_editor_files()
      
      res.json({files:files})
      
  } catch (error) {
      res.status(400).json({message:error})
  }
}

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
///////////////////////////////
//upload multer
// path
const editor_upload_dir = path.join(__dirname, "../../public/upload/editor");

const editorStorage = multer.diskStorage({
  destination:editor_upload_dir,
  filename:(req,file,cb)=>{
    let name = file.originalname;
    // if(file.mimetype.startsWith('image')){
    //   // image
    //   name = `${Date.now()}${path.extname(file.originalname)}`
    // }
    cb(null, name)
  }
})

const uploadEditorfile  = multer({storage:editorStorage}).single('file')

async function editor_file_upload_api(req,res){
  try {
    uploadEditorfile(req,res,err =>{
      // if(err) return res.status(400).json({uploaded:0,error:'file not uploaded'})
      if(req.file){
        let  filename  = req.file.filename;

        res.json({
          uploaded:1,
          filename:filename,
          url:`/upload/editor/${filename}`
        })
        // res.json({uploaded:1,filename:'i am name',url:`/upload/editor/1581668811528.jpg`})

      }
    })
  } catch (error) {
      res.status(400).json({message:error})
  }
}

module.exports = {
  add_image_post,
  editor_get_image_browser,
  editor_get_image_api,
  editor_file_upload_api
};
