function sendRequest(method, url, post=null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url);
    //  xhr.responseType ='json';  // получаем объект
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
        .then (data => document.write(data))
        .catch(err => document.write(err))


    sendRequest('POST', requestUrlPosts, post)
        .then (data => document.write(data))
        .catch(err => document.write(err))
}


//-------------------- Read all albums, particular album--------------
function albums(){
    const requestUrlAlbums = 'https://jsonplaceholder.typicode.com/albums'
    sendRequest();
    sendRequest('GET', requestUrlAlbums)
        .then (data => document.write(data))
        .catch(err => document.write(err))
}
    

//---------------Read all comments for particular post, add comment comment for post
function comments() {
    const requestUrlComments = 'https://jsonplaceholder.typicode.com/comments'
    sendRequest();
    sendRequest('GET',  requestUrlComments)
        .then (data => document.write(data.filter(data => data.postId === 2)))
        .catch(err => document.write(err))
    
    sendRequest('POST', requestUrlComments, comments)
        .then (data => document.write(data))
        .catch(err => document.write(err))
}
    

//---------------------Read all photos for particular album----------
function photos() {
    const requestUrlPhotos = 'https://jsonplaceholder.typicode.com/photos'
    sendRequest();
    sendRequest('GET', requestUrlPhotos)
        .then (data => document.write(data.filter(data => data.albumId === 5)))
        .catch(err => document.write(err))
}
    
