async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    const resp = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
    if (resp.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(resp.statusText);
    }
  
  }

  
  document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);