const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const idInput = document.querySelector('#id');
const BDTInput = document.querySelector('#BDT');
const supportInput = document.querySelector('#support');
const UniversityInput = document.querySelector('#University');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

// Load saved users on page load
window.addEventListener('DOMContentLoaded', loadUsers);

function loadUsers() {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.forEach(user => addUserToList(user));
}

myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  if (
    nameInput.value === '' ||
    idInput.value === '' ||
    BDTInput.value === '' ||
    supportInput.value === '' ||
    UniversityInput.value === ''
  ) {
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';
    setTimeout(() => {
      msg.innerHTML = '';
      msg.classList.remove('error');
    }, 3000);
  } else {
    const user = {
      name: nameInput.value,
      id: idInput.value,
      BDT: BDTInput.value,
      support: supportInput.value,
      University: UniversityInput.value
    };

    // Save to localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    // Add to UI
    addUserToList(user);

    // Clear inputs
    nameInput.value = '';
    idInput.value = '';
    BDTInput.value = '';
    supportInput.value = '';
    UniversityInput.value = '';
  }
}

function addUserToList(user) {
  const li = document.createElement('li');
  li.textContent = `${user.name} (ID: ${user.id}) contributes ${user.BDT} taka, supporting ${user.support} from ${user.University}`;

  // Add delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => deleteUser(user, li);

  li.appendChild(deleteBtn);
  userList.appendChild(li);
}

function deleteUser(userToDelete, liElement) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users = users.filter(
    user =>
      !(
        user.name === userToDelete.name &&
        user.id === userToDelete.id &&
        user.BDT === userToDelete.BDT &&
        user.support === userToDelete.support &&
        user.University === userToDelete.University
      )
  );
  localStorage.setItem('users', JSON.stringify(users));
  userList.removeChild(liElement);
}
