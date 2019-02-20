let maxlistRowsLength = 10;
let zero = 0;
let two = 2;

let rootNode = document.getElementById('main-wrap');
let inputField = document.getElementById('input-field');
let addButton = document.getElementById('add-button');
let listContainer = document.getElementById('list');
let disabledButton = document.getElementsByClassName('disabled')[zero];
let notification = document.getElementsByClassName('notification')[zero];

inputField.addEventListener('input', function () {
  if (inputField.value.trim !== '') {
    addButton.classList.remove('disabled'); 
  } else {
    addButton.classList.add('disabled');
  }
});

addButton.addEventListener('click', function() {
  disabledButton = document.getElementsByClassName('disabled')[zero];
  if (!disabledButton) {
    let text = inputField.value;
    createTask(text);
    inputField.value = '';
    addButton.classList.add('disabled');
  }
});

function createTask(text) {
  let listRow = document.createElement('div');
  listRow.classList.add('list-row');
  listRow.setAttribute('draggable',true);

  maxListLength();

  let checkAndText = document.createElement('div');
  checkAndText.className = 'check-and-text';
  
  let checkBox = document.createElement('i');
  checkBox.className = 'material-icons check-box';
  checkBox.innerText = 'check_box_outline_blank';

  let rowText = document.createElement('p');
  rowText.className = 'row-text';
  rowText.innerText = text;

  let deleteRow = document.createElement('i');
  deleteRow.className = 'material-icons delete-row';
  deleteRow.innerText = 'delete';

  listContainer.appendChild(listRow);
  listRow.appendChild(checkAndText);
  checkAndText.appendChild(checkBox);
  checkAndText.appendChild(rowText);
  listRow.appendChild(deleteRow);

  deleteRow.addEventListener('click', function(e) {
    e.target.parentNode.remove();
    maxListLength();
  });

  checkBox.addEventListener('click', function() {
    checkBox.innerText = 'check_box';
  });
}

function maxListLength() {
  let rowsCount = document.getElementsByClassName('list-row');
  if (rowsCount.length >= maxlistRowsLength) {
    addButton.classList.add('disabled');
    notification.style.display = 'block';
    return false;
  } else {
    addButton.classList.remove('disabled');
    notification.style.display = 'none';
    return true;
  }
}

function actionTarget(e) {
  let target = e.target;
  if (target.hasAttribute('draggable')) {
    return target;
  }
}
let draggableElement = null;
let dropPosition = null;

listContainer.addEventListener('dragstart', function(e) {
  draggableElement = actionTarget(e);
  if (!draggableElement) {
    return;
  }
  draggableElement.style.opacity = '.7';
}, false);

listContainer.addEventListener('dragend', function() {
  draggableElement.style.opacity = '';
});

listContainer.addEventListener('dragover',function(e) {
  e.preventDefault();
  let dropPosition = actionTarget(e);
  if (!dropPosition) {
    return;
  }
});

listContainer.addEventListener('dragleave', function(e) {
  let dropPosition = actionTarget(e);
  if (!dropPosition) {
    return;
  }
});

listContainer.addEventListener('drop', function (e) {
  dropPosition = actionTarget(e);
  if (!dropPosition) {
    return;
  }
  e.preventDefault();
  let rect = dropPosition.getBoundingClientRect();
  let midline = rect.top + (rect.bottom - rect.top) / two;
  let afterDropPosition = midline <= e.clientY ? dropPosition.nextSibling : dropPosition;
  listContainer.insertBefore(draggableElement, afterDropPosition);
});