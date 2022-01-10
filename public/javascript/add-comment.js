const commentFormEl = document.getElementById('add-comment');

async function commentFormHandler(event) {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const comment_body = document.getElementById('comment-body').value.trim();

    const response = await fetch('/api/comment', {
        method: 'POST',
        body: {
            post_id,
            comment_body
        },
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

commentFormEl.addEventListener('submit', commentFormHandler);