// Add event listeners to edit and delete buttons
const editButtons = document.querySelectorAll('.edit-comment');
editButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const commentId = button.dataset.commentid;
		editComment(commentId);
	});
});

const deleteButtons = document.querySelectorAll('.delete-comment');
deleteButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const commentId = button.dataset.commentid;
		deleteComment(commentId);
	});
});

// Edit a comment
function editComment(commentId) {
	// Hide the comment text
	document.querySelector(`#comment-text-id-${commentId}`).classList.add('hidden');
	// Show the comment edit div
	document.querySelector(`#comment-edit-id-${commentId}`).classList.remove('hidden');
}

// Delete a comment
async function deleteComment(commentId) {
	const response = await fetch(`/api/comment/${commentId}`, {
		method: 'DELETE',
	});
	if (response.ok) {
		// Reload the page to update comments view
		window.location.reload();
	} else {
		console.log(response);
	}
}

// When editing a comment, setup the event listener for the save and cancel buttons
const editSaveButtons = document.querySelectorAll('.edit-save-comment');
editSaveButtons.forEach((button) => {
	button.addEventListener('click', async () => {
		const commentId = button.dataset.commentid;
		// Get the new comment text
		const newCommentText = document.querySelector(`#comment-edit-text-id-${commentId}`).value;
		// Update the comment
		const response = await fetch(`/api/comment/${commentId}`, {
			method: 'PUT',
			body: JSON.stringify({ commentText: newCommentText }),
			headers: { 'Content-Type': 'application/json' },
		});
		if (response.ok) {
			// Reload the page to update comments view
			window.location.reload();
		} else {
			console.log(response);
		}
	});
});

const editCancelButtons = document.querySelectorAll('.edit-cancel-comment');
editCancelButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const commentId = button.dataset.commentid;
		// Hide the comment edit div
		document.querySelector(`#comment-edit-id-${commentId}`).classList.add('hidden');
		// Show the comment text
		document.querySelector(`#comment-text-id-${commentId}`).classList.remove('hidden');
	});
});

// Update a comment on the server
function updateComment(commentId, newCommentText) {}
