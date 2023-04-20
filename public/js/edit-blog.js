document.getElementById('blog-submit-button').addEventListener('click', async function (event) {
	event.preventDefault();
	const title = document.getElementById('blog-title').value;
	const content = document.getElementById('blog-content').value;
	const tags = document.getElementById('blog-tags').value;
	const response = await fetch(`/api/blog/${blogData.id}`, {
		method: 'PUT',
		body: JSON.stringify({ title, blog_content: content, tags }),
		headers: { 'Content-Type': 'application/json' },
	});
	const responseJSON = await response.json();
	document.location.replace('/blog/' + blogData.id);
});
