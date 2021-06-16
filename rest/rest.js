function sendRequest(method, url, post=null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url);
        xhr.responseType ='json';  // получаем объект
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response)
            }
            else {
            resolve(xhr.response);  // all posts
            // resolve(xhr.response[23]);  // post №23
            }
        }    
        xhr.onrerror = () => {  // ошибка
            reject(xhr.response);  
        }
        xhr.send(JSON.stringify(post));  //отправляем результат
    })
}
const requestUrlPosts = 'https://jsonplaceholder.typicode.com/posts'
const requestUrlPhotos = 'https://jsonplaceholder.typicode.com/photos'
const requestUrlComments = 'https://jsonplaceholder.typicode.com/comments'
const requestUrlAlbums = 'https://jsonplaceholder.typicode.com/albums'

const post =  {
    userId: 3,
    title: "asperiores ea ipsam voluptatibus modi minima quia sint",
    postId: 2,
    albumId: 5
}
let i = 1;
function request(URL, i) {
    sendRequest();
    sendRequest('GET', URL)
        .then (data => data.forEach(item => {  
            let table = document.querySelector('#table');
            let items = document.querySelectorAll('#pagination li');
            let pagination = document.querySelector('#pagination');
            let notesOnPage=30;
            if ( i <= Math.ceil(data.length / notesOnPage)) {
                let li = document.createElement('li');
                li.innerHTML = i;       
                i++;
                pagination.appendChild(li);  
            }
            for (item of items) {
                item.addEventListener("click", function() {
                    let pageNum = +this.innerHTML;
                    let start = (pageNum - 1) * notesOnPage;
                    let end = start + notesOnPage;
                    let notes = data.slice(start, end);
                
                    table.innerHTML = '';
                    for (let note of notes) {
                        let tr = document.createElement('tr');
                        table.appendChild(tr);
                        if (note.url) {
                            createCell(note.title, tr);
                            createCell(note.url, tr);          //photos
                            createCell(note.thumbnailUrl , tr); 
                        } 
                        else 
                            if (note.title && note.body) {
                                createCell(note.title, tr);   //posts
                                createCell(note.body, tr);          
                            }
                            else
                                if (note.name) {
                                    createCell(note.name, tr);   //comments
                                    createCell(note.body, tr);
                                    createCell(note.email, tr); 
                                }    
                                else
                                    createCell(note.title, tr);  //albums
	    	        }
                });
            }
            function createCell(text, tr) {
                let td = document.createElement('td');
                td.innerHTML = text;
                tr.appendChild(td);
            }
        }))
        .catch(err => console.log(err)) 
        
   document.querySelector('#pagination').innerHTML = '';
 
    sendRequest('POST', URL, post)
        .then (data =>(data))
        .catch(err => console.log(err))
}