async function commentFormHandler(event) {
    event.preventDefault();
  
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
  
    const postId = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (comment_text) {
        const resp = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            postId,
            comment_text
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (resp.ok) {
          document.location.reload();
        } else {
          alert(resp.statusText);
        }
      }
      

  }
  
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);