const theme_button = document.querySelectorAll('.theme_button')
const body = document.querySelector('body')
// datail
const detailTitle = document.querySelector('#detail-page .post-title')
const detailDate = document.querySelector('#detail-page .post-date')
const detailBody = document.querySelector('#detail-page .post-body')



function set_dark_theme(){
	remove_class_name()
	// index
	const indexCard = document.querySelectorAll('#index-page .card')
	const indexCategories = document.querySelectorAll('#categories-item li')

	
		// dark
		// body
		body.classList.add('grey')
		body.classList.add('darken-4')
		// detail
		if(detailTitle){
			detailBody.classList.add('white-text')
			detailTitle.classList.add('white-text')
			detailDate.classList.add('white-text')
		}
		
		// index
		if(indexCard){
			for (let card of indexCard){
				card.classList.add('white-text')
				card.classList.add('grey')
				card.classList.add('darken-3')
			}
		}
		if (indexCategories){
			for(let cate of indexCategories){
				cate.classList.add('blue-text')
				cate.classList.add('grey')
				cate.classList.add('darken-3')
			}
		}
		
}

function set_light_theme(){
	remove_class_name()
	// index
	const indexCard = document.querySelectorAll('#index-page .card')
	const indexCategories = document.querySelectorAll('#categories-item li')

	
		// dark
		// body
		body.classList.add('grey')
		body.classList.add('darken-4')
		// detail
		if(detailTitle){
			detailBody.classList.add('white-text')
			detailTitle.classList.add('white-text')
			detailDate.classList.add('white-text')
		}
		
		// index
		if(indexCard){
			for (let card of indexCard){
				card.classList.add('white-text')
				card.classList.add('grey')
				card.classList.add('darken-3')
			}
		}
		if (indexCategories){
			for(let cate of indexCategories){
				cate.classList.add('blue-text')
				cate.classList.add('grey')
				cate.classList.add('darken-3')
			}
		}
		
}
function remove_class_name(){
	// index
	const indexCard = document.querySelectorAll('#index-page .card')
	const indexCategories = document.querySelectorAll('#categories-item li')

	
		// dark
		// body
		body.classList.remove('grey')
		body.classList.remove('darken-4')
		// detail
		if(detailTitle){
			detailBody.classList.remove('white-text')
			detailTitle.classList.remove('white-text')
			detailDate.classList.remove('white-text')
		}
		
		// index
		if(indexCard){
			for (let card of indexCard){
				card.classList.remove('white-text')
				card.classList.remove('grey')
				card.classList.remove('darken-3')
			}
		}
		if (indexCategories){
			for(let cate of indexCategories){
				cate.classList.remove('blue-text')
				cate.classList.remove('grey')
				cate.classList.remove('darken-3')
			}
		}
		
}

function change_color_theme_button(name){
	if (name == 'dark'){
			// dark
			if(theme_button){
				for(let btn of theme_button){
					btn.innerText = 'Dark Theme'
					btn.classList.add('black')
					btn.dataset.target = 'light'
				}
			}
		}else{
			// light
			if(theme_button){
				for(let btn of theme_button){
					btn.innerText = 'Light Theme'
					btn.classList.remove('black')
					btn.dataset.target = 'dark'
				}
			}
		}
}

function theme_change(e){
	let name = e.dataset.target;
	if (name == 'dark'){
		// dark
		set_dark_theme()
		set_local(name)
		change_color_theme_button(name)
	}else{
		// light
		remove_class_name()
		set_local('light')
		change_color_theme_button('light')
	}
}

function set_local(name){
	window.localStorage.setItem('thme_name',name)
}

window.onload = () =>{
	let name = window.localStorage.getItem('thme_name')
	if (name != null){
		if (name == 'dark'){
			// dark
			set_dark_theme()
			set_local(name)
			change_color_theme_button(name)
		}else{
			// light
			remove_class_name()
			set_local('light')
			change_color_theme_button('light')
		}
	}
}