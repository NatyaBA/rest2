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
   
function request(URL) {
    sendRequest();
    sendRequest('GET', URL)
        .then (data => data.forEach(item => {        
            let card = document.createElement('div');
            card.classList.add('card');
           
            if (item.url) {
                card.innerHTML = "<div class='title'>" + item.title + "</div><img src=" + item.url + "></div><img src=" + item.thumbnailUrl + "></div>";
            } 
            else 
                if (item.title && item.body) {
                    card.innerHTML = "<div class='title'>" + item.title + "</div><div>" + item.body + "</div>";                    
                }
                else
                    if (item.name)
                        card.innerHTML = "<div class='title'>" + item.name + "</div><div>" + item.email + "</div><div>" + item.body + "</div>";
                    else
                        card.innerHTML = "<div class='title'>" + item.title + "</div>";
                   
            document.querySelector('.app').appendChild(card);
            
        }))
        .catch(err => console.log(err)) 
        
    document.querySelector('.app').innerHTML = '';
 
    sendRequest('POST', URL, post)
        .then (data =>(data))
        .catch(err => console.log(err))
}