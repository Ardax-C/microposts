import { http } from './http';
import { ui } from './UI'

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete request
document.querySelector('#posts').addEventListener('click', deletePost);


function getPosts() {
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPosts(data))
  .catch(err => console.log(data));
}

function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  const data = {
    title,
    body
  }

  // Create post
  http.post('http://localhost:3000/posts', data)
  .then(data => {
    ui.showAlert('Post added!', 'alert alert-success');
    ui.clearFields();
    getPosts();
  })
  .catch(err => console.log(err));
}

function deletePost(e) {
  const deleteIcon = document.querySelector('.delete');
  const post = deleteIcon.parentElement.parentElement;
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    console.log(post);
    if (confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
      .then(data => {
        ui.showAlert('Post removed!', 'alert alert-success');
        getPosts();
      })
      .catch(err => console.log(err));
    }    
  } 
}