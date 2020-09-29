let fileChooseUrl = null;

let tooltipped = document.querySelectorAll('.tooltipped')
let checkmarks = document.querySelectorAll('.checkmarks')
let choose_button = document.querySelector('#choose-button')
let video_tab_btn = document.querySelector('#video_tab_btn')
let image_tab_btn = document.querySelector('#image_tab_btn')
let video_tab = document.querySelector('#video-tab')
let image_tab = document.querySelector('#image-tab')

M.Tooltip.init(tooltipped)
// hide tab
function hide_tab(name){
    if(name == 'video'){
        // show img
        image_tab.style.display = 'block'
        image_tab_btn.classList.add('teal')
        video_tab.style.display = 'none'
        video_tab_btn.classList.remove('teal')
    }else if(name == 'image'){
        // show video
        video_tab.style.display = 'block'
        video_tab_btn.classList.add('teal')
        image_tab.style.display = 'none'
        image_tab_btn.classList.remove('teal')
    }else if(name == 'all'){
        video_tab.style.display = 'none'
        video_tab_btn.classList.remove('teal')
        image_tab.style.display = 'none'
        image_tab_btn.classList.remove('teal')
        // show file tab
    }
}
window.onload = ()=>{
    hide_tab('video')
    choose_button.style.display = 'none'
}

// hide choose all
function hide_all_checkmarks(){
    for(let mark of checkmarks){
        mark.classList.remove('choosed')
    }
}

// choose buttton click
function choose_button_click(){
    if (fileChooseUrl != null){
        window.opener.CKEDITOR.tools.callFunction( 1, fileChooseUrl );
        window.close();
    }
}

// choose blur
// window.addEventListener('click',e =>{
//     console.log(e.target.className)
// })


function chooseImage(e){
    hide_all_checkmarks()
    e.previousElementSibling.classList.add('choosed')
    // file url
    fileChooseUrl = e.src;
    // show choose button
    choose_button.style.display = 'inline-block'
    
}
        