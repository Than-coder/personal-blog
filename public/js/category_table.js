// dom
const category_modal = document.querySelector('#category-edit')
const category_new = document.querySelector('#category-new')
const category_modal_input = document.querySelector('#category-edit-input')
const category_modal_id = document.querySelector('#category-edit-id')

////////////////////////////////
// category delete
////////////////////////////////

async function category_delete(id){
    if(window.confirm('Are You Sure?') == false) return false; 
    try {
        let res = await axios.delete(`/dashboard/server-api-category-delete/?category_id=${id}`)
        // success
        M.toast({html:res.data.message})
        // refresh
        window.location.href = '/dashboard/category-table'
        
    } catch (error) {
        console.log(error.response)
        M.toast({html:error.response.statusText})
        M.toast({html:error.response.data.message})
    }
}


///////////////////////////////////
// edit
///////////////////////////////////
function category_name_edit(e){
    let id = e.dataset.id
    let name = e.dataset.name;

    category_modal.style.display = 'block'
    category_modal_input.value = name;
    category_modal_id.value = id;
    // focus
    category_modal_input.focus()
    // window.prompt(`Change Category Name`,name)
}

// category_modal close
function category_modal_close(){
    category_modal.style.display = 'none'
    category_new.style.display = 'none'
}

// submit edit 
async function category_modal_submit(){
    
    const id = document.querySelector('#category-id').value
    const name = document.querySelector('#category-input').value
    
    try {
        let res = await axios.put(`/dashboard/server-api-category-name-update/?id=${id}&name=${name}`,{},{
            headers:{
                'Content-Type':'application/json'
            }
        })
        
        M.toast({html:res.data.message})
        // refresh
        setTimeout(()=>{
            window.location.href = '/dashboard/category-table'
        },1200)
        
    } catch (error) {
        console.log(error.response)
        M.toast({html:error.response.statusText})
        M.toast({html:error.response.data.message})
    }
}

///////////////////////////
// new category
///////////////////////////
// show
function new_category(){
    category_new.style.display = 'block'
    // cursor
    const name_input = document.querySelector('#category-new-input')
    name_input.focus()

}

// submit
async function category_new_modal_submit(){
    const name_input = document.querySelector('#category-new-input')
    if(name_input.value == ''){
        return M.toast({html:'Category Name Field is Empty!'})
    }
    try {
        let res = await axios.put(`/dashboard/server-api-category-name-new/?name=${name_input.value}`,{},{
            headers:{
                'Content-Type':'application/json'
            }
        })
        
        M.toast({html:res.data.message})
        // refresh
        setTimeout(()=>{
            window.location.href = '/dashboard/category-table'
        },1200)
    } catch (error) {
        console.log(error.response)
        M.toast({html:error.response.statusText})
        M.toast({html:error.response.data.message})
    }
}