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

const post =  {
    userId: 3,
    title: "asperiores ea ipsam voluptatibus modi minima quia sint",
    postId: 2,
    albumId: 5
}


//-----------------Read all post, particular post, create/edit post-------
function posts() { 
    const requestUrlPosts = 'https://jsonplaceholder.typicode.com/posts'
    sendRequest();
    sendRequest('GET', requestUrlPosts)
        .then (data =>data.forEach(item => {
            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
             <div class="title">${item.title}</div>
             <div class="body">${item.body}</div>
            `;
            document.querySelector('.app').appendChild(card);
        }))
        .catch(err => console.log(err))


    sendRequest('POST', requestUrlPosts, post)
        .then (data =>data.forEach(item => {
            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
            <div class="title">${item.title}</div>
            <div class="body">${item.body}</div>
            `;
            document.querySelector('.app').appendChild(card);
        }))
        .catch(err => console.log(err))
}


//-------------------- Read all albums, particular album--------------
function albums(){
    const requestUrlAlbums = 'https://jsonplaceholder.typicode.com/albums'
    sendRequest();
    sendRequest('GET', requestUrlAlbums)
        .then (data =>data.forEach(item => {
            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
            <div class="title">${item.title}</div>
            `;
            document.querySelector('.app').appendChild(card);
        }))
        .catch(err => console.log(err))
}
    

//---------------Read all comments for particular post, add comment comment for post
function comments() {
    const requestUrlComments = 'https://jsonplaceholder.typicode.com/comments'
    sendRequest();
    sendRequest('GET',  requestUrlComments)
        .then (data => data.forEach(item => {
            //data.filter(data => data.postId === 2);
            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
             <div class="title">${item.name}</div>
             <div class="body">${item.email}</div>
             <div class="body">${item.body}</div>
            `;
            document.querySelector('.app').appendChild(card);
        }))
        .catch(err => console.log(err))
    
    sendRequest('POST', requestUrlComments, comments)
        .then (data =>(data))
        .catch(err => console.log(err))
}
    

//---------------------Read all photos for particular album----------
function photos() {
    const requestUrlPhotos = 'https://jsonplaceholder.typicode.com/photos'
    sendRequest();
    sendRequest('GET', requestUrlPhotos)
        .then (data => data.forEach(item => {
            //data.filter(data => data.postId === 2);
            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
            <div class="title">${item.title}</div>
            <img src="${item.url}"></div>
            <img src="${item.thumbnailUrl}"></div>
            `;
            document.querySelector('.app').appendChild(card);
        }))
        .catch(err => console.log(err))
}
    
