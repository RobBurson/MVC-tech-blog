function addClass() {
	var text = document.getElementById('create-blog');
	text.classList.remove('hide');

  var createButton = document.getElementById('create');
	createButton.remove();
}

async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const postText = document.querySelector('textarea[name="post-body"]').value;
  
    const resp = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        postText
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (resp.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('You must enter both a Title and a Body');
    }
  }
  
  document.querySelector('.submit-post-form').addEventListener('submit', newFormHandler);
  