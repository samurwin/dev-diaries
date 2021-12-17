const postFormEl = document.getElementById('create-post');

async function postFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const post_body = document.querySelector('textarea[name="post-body"]').value.trim();
    
    const response = await fetch('api/post/', {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_body
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
};

postFormEl.addEventListener('submit', postFormHandler);