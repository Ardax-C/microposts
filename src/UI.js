class UI {
    constructor() {
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.formState = 'add';
    }

    showPosts(posts) {
        let output = '';

        posts.forEach((post) => {
            output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class='card-text'>${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete edit card-link" data-id="${post.id}">
              <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
      `;
        });
        this.post.innerHTML = output;
    }

    showAlert(message, className) {
        this.clearAlert();
        // Create div
        const div = document.createElement('div');
        // Add classes
        div.className = className;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get Parent
        const container = document.querySelector('.postsContainer');
        // Get posts
        const posts = document.querySelector('#posts');
        // Insert alert div
        container.insertBefore(div, posts);
        // Timeout
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    clearAlert() {
        const currentAlert = document.querySelector('.alert');
        if (currentAlert) {
            currentAlert.remove();
        }
    }

    clearFields() {
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    // Fill form to edit
    fillForm(data) {
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        this.changeFormState('edit');
    }

    // Clear ID hidden value
    clearIDInput() {
        this.idInput.value = '';
    }

    // Change form state
    changeFormState(type) {
        if (type === 'edit') {
            this.postSubmit.textContent = 'Update Post';
            this.postSubmit.className =
                'post-submit btn btn-warning btn-block mt-3';

            if (!document.querySelector('.post-cancel')) {
                // Create cancel button
                const button = document.createElement('button');
                button.className = 'post-cancel btn btn-danger btn-block mt-2';
                button.appendChild(document.createTextNode('Cancel Edit'));
                // Get parent
                const cardForm = document.querySelector('.card-form');
                // Get element to insert before
                const formEnd = document.querySelector('.form-end');
                // Insert cancel button
                cardForm.insertBefore(button, formEnd);
            }
        } else {
            this.postSubmit.textContent = 'Speak your mind!';
            this.postSubmit.className =
                'post-submit btn btn-primary btn-block mt-3';

            // Remove cancel button if there
            if (document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove();
            }
            // Clear ID from hidden field
            this.clearIDInput();
            // Clear text fields
            this.clearFields();
        }
    }
}

export const ui = new UI();
