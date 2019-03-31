
window.onload = function() {
  let refId = window.location.search.substring(1,10);

  if (window.location.search === '') {
    getRequest('GET', 'https://jsonplaceholder.typicode.com/users', renderUserList);
  } else if (refId === 'userPosts') {
    getRequest('GET', 'https://jsonplaceholder.typicode.com/posts', renderPosts);
    // getRequest('https://jsonplaceholder.typicode.com/comments', renderComments);
  }
}

function getRequest(method, url, callback = function(){}) {
  let data = null;
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      callback(JSON.parse(this.responseText));
    }
  });
  xhr.open(method, url, true);
  xhr.send(data);
}

function renderPosts(res) {
  for (let key in res) {
    if (res[key].hasOwnProperty('userId')) {
      if (res[key].userId == window.location.search.slice(11)) {
        createPost(res[key]);
      }
    }
  }
}
function createPost(postObj) {
  console.log(postObj);
  let {id, body, title} = postObj;
  let html = `
  <div class="post-head">
    <p>${title}</p>
  </div>
  <div class="post-main">
    <p>${body}</p>
  </div>
  <div class="comments-container"></div>
  `;
  let post = document.createElement('div');
  post.classList.add('post');
  post.id = `post-${id}`;
  post.innerHTML = html;

  let commentsContainer = post.getElementsByClassName('comments-container')[0];
  commentsRef(commentsContainer, id);

  document.getElementById('block').appendChild(post);
}

function commentsRef(container, postId) {
  let data = null;
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      renderComments(JSON.parse(this.responseText), container, postId);
    }
  });
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/comments', true);
  xhr.send(data);
}

function renderComments(res, container, postId) {
  console.log(res);
  for (let key in res) {
    if (res[key].hasOwnProperty('postId')) {
      console.log(res[key]);
      if (res[key].postId == postId) {
        createComment(res[key], container);
      }
    }
  }
}
function createComment(comment, container) {
  let {body, id, name} = comment;
  let html = `
  <p class="com-name">${name}:</p>
  <p class="com-body">${body}></p>  
  `;

  let commentContainer = document.createElement('div');
  commentContainer.classList.add('comment');
  commentContainer.id = `comment-${id}`;
  commentContainer.innerHTML = html;

  container.appendChild(commentContainer);
}


function renderUserList(res) {
  console.log(res);
  res.forEach(el => {
    createUserCard(el);
  });
}
function createUserCard(user) {
  let {
    id: id,
    address: {city, street, zipcode},
    company: {name: companyName},
    name: userName,
    phone: userphone
  } = user;

  let html = `
  <div class="head">
    <img class="avatar">
  </div>
  <div class="small-info">
    <p class="username"><a href="/?userPosts=${id}">${userName}</a></p>
    <div class="actions">
      <input type="text" class="input" value="changes" disabled>
      <button class="button edit-btn" type="submit">Edit</button>
      <button class="button delete-btn" type="submit">Delete</button>
    </div>
  </div>
  <div class="main">
    <div class="address">
      <p>address:</p>
      <div>City: ${city}</div>
      <div>Street: ${street}</div>
      <div>Zipcode: ${zipcode}</div>
    </div>
    <div class="footer">
      <p>company: ${companyName}</p>
      <p>phone: ${userphone}</p>
    </div>
  </div>
  `;
  let card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = html;

  let avatar = card.getElementsByClassName('avatar')[0];
  addAvatar(avatar);

  document.getElementById('block').appendChild(card);

  let deleteBtn = card.getElementsByClassName('delete-btn')[0];
  deleteBtn.addEventListener('click', () => {
    if (confirm('remove this post?')) {
      card.remove();
      getRequest('DELETE', `https://jsonplaceholder.typicode.com/users/${user.id}`);
    }
  });
}

function addAvatar(avatar) {
  let data = null;
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      let avatarURL = JSON.parse(this.responseText)[0].url;
      avatarURL.endsWith('jpg') ? 
        avatar.src = JSON.parse(this.responseText)[0].url :addAvatar(avatar);
    }
  });
  xhr.open('GET', 'https://api.thecatapi.com/v1/images/search', true);
  xhr.send(data);
}