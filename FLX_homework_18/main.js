let block = document.getElementById('block');
let spinner = document.getElementsByClassName('spinner')[0];

window.onload = function() {
  let refId = window.location.search.substring(1,10);

  if (window.location.search === '') {
    getRequest('GET', 'https://jsonplaceholder.typicode.com/users', renderUserList);
  } else if (refId === 'userPosts') {
    getRequest('GET', 'https://jsonplaceholder.typicode.com/posts', renderPosts);
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
  xhr.onerror = () => {
    console.error(xhr.statusText);
  };
  xhr.open(method, url, true);
  xhr.send(data);
}

function renderPosts(res) {
  spinnerHide(false);
  for (let key in res) {
    if (res[key].hasOwnProperty('userId')) {
      if (res[key].userId == window.location.search.slice(11)) {
        createPost(res[key]);
      }
    }
  }
}
function createPost(postObj) {
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
  for (let key in res) {
    if (res[key].hasOwnProperty('postId')) {
      if (res[key].postId == postId) {
        createComment(res[key], container);
      }
    }
  }
  spinnerHide(true);
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
  res.forEach(el => {createUserCard(el)});
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
    <p class="username"><a class="user-ref" href="/?userPosts=${id}">${userName}</a></p>
    <div class="actions">
      <button class="button edit-btn" type="submit">Edit</button>
      <button class="button delete-btn" type="submit">Delete</button>
    </div>
  </div>
  <div class="main">
    <div class="address">
      <p>address:</p>
      <div class="city-name">City: ${city}</div>
      <div class="street-name">Street: ${street}</div>
      <div class="zipcode">Zipcode: ${zipcode}</div>
    </div>
    <div class="footer">
      <p class="company-name">company: ${companyName}</p>
      <p class="phone-num">phone: ${userphone}</p>
    </div>
  </div>
  <div class="edit-plate hide">
    <form name="user">
      <label> User name:
        <input class="edit-inp e-user-name" type="text" name="userName" value="${userName}">
      </label>
      <label> City:
        <input class="edit-inp e-city" type="text" name="city" value="${city}">
      </label>
      <label> Street:
        <input class="edit-inp e-street" type="text" name="street" value="${street}">
      </label>
      <label> Zipcode:
        <input class="edit-inp e-zipcode" type="text" name="zipcode" value="${zipcode}">
      </label>
      <label> CompanyName:
        <input class="edit-inp e-company-name" type="text" name="companyName" value="${companyName}">
      </label>
      <label> User userphone:
        <input class="edit-inp e-user-phone" type="text" name="userphone" value="${userphone}">
      </label>
      <input class="button save-edit-changes-btn" type="button" name="user" value="Save changes">
    </form>
  </div>
  `;
  let card = document.createElement('div');
  card.classList.add('card');
  card.id = `user-${id}`;
  card.innerHTML = html;

  let avatar = card.getElementsByClassName('avatar')[0];
  addAvatar(avatar);
  
  block = document.getElementById('block');
  block.appendChild(card);

  let deleteBtn = card.getElementsByClassName('delete-btn')[0];
  deleteBtn.addEventListener('click', () => {
    if (confirm('remove this post?')) {
      card.remove();
      getRequest('DELETE', `https://jsonplaceholder.typicode.com/users/${user.id}`);
    }
  });

  let editBtn = card.getElementsByClassName('edit-btn')[0];
  let editPlate = card.getElementsByClassName('edit-plate')[0];
  editBtn.addEventListener('click', () => {
    editPlate.classList.toggle('hide');
  });


  let saveChanges = card.getElementsByClassName('save-edit-changes-btn')[0];
  saveChanges.addEventListener('click', () => {
    editPlate.classList.add('hide');

    let editUserName = card.getElementsByClassName('e-user-name')[0];
    let editCity = card.getElementsByClassName('e-city')[0];
    let editStreet = card.getElementsByClassName('e-street')[0];
    let editZipCode = card.getElementsByClassName('e-zipcode')[0];
    let editCompanyName = card.getElementsByClassName('e-company-name')[0];
    let editUserPhone = card.getElementsByClassName('e-user-phone')[0];
    
    let editData = {
      id: id,
      name: editUserName.value,
      address: {
        city: editCity.value,
        street: editStreet.value,
        zipcode: editZipCode.value
      },
      company: {name: editCompanyName.value},
      phone: editUserPhone.value
    }
    renderEditCard(card);
    submitEditUserData(editData);
  });
}

function renderEditCard(card) {
  let editUserName = card.getElementsByClassName('e-user-name')[0];
  let editCity = card.getElementsByClassName('e-city')[0];
  let editStreet = card.getElementsByClassName('e-street')[0];
  let editZipCode = card.getElementsByClassName('e-zipcode')[0];
  let editCompanyName = card.getElementsByClassName('e-company-name')[0];
  let editUserPhone = card.getElementsByClassName('e-user-phone')[0];

  let userNameEl = card.getElementsByClassName('user-ref')[0];
  let cityEl = card.getElementsByClassName('city-name')[0];
  let streetEl = card.getElementsByClassName('street-name')[0];
  let zipcodeEl = card.getElementsByClassName('zipcode')[0];
  let companyNameEl = card.getElementsByClassName('company-name')[0];
  let phoneEl = card.getElementsByClassName('phone-num')[0];

  userNameEl.innerText = editUserName.value;
  cityEl.innerText = 'City: ' + editCity.value;
  streetEl.innerText = 'Street: ' + editStreet.value;
  zipcodeEl.innerText = 'Zipcode: ' + editZipCode.value;
  companyNameEl.innerText = 'company: ' + editCompanyName.value;
  phoneEl.innerText = 'phone: ' + editUserPhone.value;
}

function submitEditUserData(user) {
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      return;
    }
  });
  xhr.onerror = () => {
    console.error(xhr.statusText);
  };
  xhr.open('PUT', `https://jsonplaceholder.typicode.com/users/${user.id}`, true);
  xhr.send(user);

  spinnerHide(true);
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
  spinnerHide(true);
}

function spinnerHide(boolean) {
  block = document.getElementById('block');
  spinner = document.getElementsByClassName('spinner')[0];

  if (boolean) {
    spinner.classList.add('hide');
    block.classList.remove('hide');
  } else {
    spinner.classList.remove('hide');
    block.classList.add('hide');
  }
}