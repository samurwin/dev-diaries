const commentFormEl = document.getElementById('add-comment');

async function commentFormHandler(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const comment_body = document.getElementById('comment-body').value.trim();

    console.log(post_id, comment_body);

    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
            post_id,
            comment_body
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

commentFormEl.addEventListener('submit', commentFormHandler);