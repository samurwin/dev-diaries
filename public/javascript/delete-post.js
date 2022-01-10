const deletePostBtnEl = document.getElementById('delete-btn');

async function deletePostHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert(response.statusText);
    }
}

deletePostBtnEl.addEventListener('click', deletePostHandler);