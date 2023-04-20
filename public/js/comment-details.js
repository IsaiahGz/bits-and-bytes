// Add event listeners to edit and delete buttons
const editButtons = document.querySelectorAll('.edit-comment');
editButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const commentId = button.dataset.commentId;
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
	// Get the comment element and text
	const commentElement = document.getElementById(`comment-${commentId}`);
	const commentTextElement = commentElement.querySelector('.comment-text');
	const commentText = commentTextElement.textContent;

	// Replace the text with an input field
	const inputField = document.createElement('textarea');
	inputField.value = commentText;
	commentElement.replaceChild(inputField, commentTextElement);

	// Replace the "Edit" button with a "Save" button
	const editButton = commentElement.querySelector('.edit-comment');
	const saveButton = document.createElement('button');
	saveButton.textContent = 'Save';
	saveButton.dataset.commentId = commentId;
	saveButton.addEventListener('click', () => {
		// Get the new comment text and update the UI
		const newCommentText = inputField.value;
		const newCommentTextElement = document.createElement('p');
		newCommentTextElement.classList.add('comment-text');
		newCommentTextElement.textContent = newCommentText;
		commentElement.replaceChild(newCommentTextElement, inputField);

		// Update the comment on the server
		updateComment(commentId, newCommentText);

		// Replace the "Save" button with the "Edit" button
		commentElement.replaceChild(editButton, saveButton);
	});
	commentElement.replaceChild(saveButton, editButton);
}

// Delete a comment
async function deleteComment(commentId) {
	const response = await fetch(`/api/blog/${blogData.id}`, {
		method: 'DELETE',
	});
	console.log(response);
	// Redirect to the homepage
	window.location.reload();
}

// Update a comment on the server
function updateComment(commentId, newCommentText) {}
