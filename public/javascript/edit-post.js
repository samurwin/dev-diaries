const editPostBtnEl = document.getElementById('edit-btn');

async function editPostFormHandler(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const post_body = document.querySelector('textarea[name="post-body"]').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/post/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_body
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok) {
        document.location.replace('/profile');
    } else {
        alert(response.statusText);
    }
}

editPostBtnEl.addEventListener('click', editPostFormHandler);