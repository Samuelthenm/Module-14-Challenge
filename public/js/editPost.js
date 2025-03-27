const editPostHandler = async (event) => {
    event.preventDefault();

    const postId = document.querySelector('#post-id').value;
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to update post.');
    }
};

document
    .querySelector('.edit-post-form')
    .addEventListener('submit', editPostHandler);