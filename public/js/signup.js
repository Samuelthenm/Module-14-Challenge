const addCommentHandler = async (event) => {
    event.preventDefault();

    const commentText = document.querySelector('#comment-text').value.trim();
    const postId = document.querySelector('.comment-form').getAttribute('data-postid');

    if (commentText) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                comment_text: commentText,
                post_id: postId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to add comment.');
        }
    }
};

const deleteCommentHandler = async (event) => {
    if (event.target.classList.contains('delete-comment')) {
        const commentId = event.target.getAttribute('data-id');

        const response = await fetch(`/api/comments/${commentId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to delete comment.');
        }
    }
};

document
    .querySelector('.comment-form')
    .addEventListener('submit', addCommentHandler);

document
    .querySelector('.comments-section')
    .addEventListener('click', deleteCommentHandler);
