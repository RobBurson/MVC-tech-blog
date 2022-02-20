async function editFormHandler(event) {
    event.preventDefault();
    
    // Capture the id of the post
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
      const title = document.querySelector('input[name="post-title"]').value;
      const postText = document.getElementById('post-text').value;
      const resp = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title, postText
          }),
          headers: {
            'Content-Type': 'application/json'
          }
      });
      // check the response status
      
    if (resp.ok) {
        document.location.replace('/dashboard');
        console.log(title, postText); // these values are both showing up correctly in console!
    } else {
        alert(resp.statusText);
    }
  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);