const deletePostHandler = async (event) => {
    if (event.target.classList.contains('delete-post')) {
        const postId = event.target.getAttribute('data-id');

        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.location.reload();  
        } else {
            alert('Failed to delete post.');
        }
    }
};

document
    .querySelector('.dashboard')
    .addEventListener('click', deletePostHandler);