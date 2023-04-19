document.getElementById('submit-button').addEventListener('click', async function (event) {
	event.preventDefault();
	const title = document.getElementById('blog-title').value;
	const content = document.getElementById('content').value;
	const response = await fetch('/api/blog', {
		method: 'POST',
		body: JSON.stringify({ title, content }),
		headers: { 'Content-Type': 'application/json' },
	});
	const responseJSON = await response.json();
	document.location.replace('/blog', responseJSON.id);
});
