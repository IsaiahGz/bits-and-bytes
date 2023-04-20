// Handle delete modal
if (document.querySelector('#blog-btn-delete')) {
	const modal = document.querySelector('#modal-delete');
	const deleteButton = document.querySelector('#blog-btn-delete');
	const cancelButton = document.querySelector('#cancel-delete');
	const confirmDeleteButton = document.querySelector('#confirm-delete');

	// Add modal event listeners
	deleteButton.addEventListener('click', () => {
		console.log('delete button clicked');
		modal.classList.remove('hidden');
	});

	cancelButton.addEventListener('click', () => {
		modal.classList.add('hidden');
	});

	confirmDeleteButton.addEventListener('click', async () => {
		// Send a DELETE request to the blog delete endpoint
		const response = await fetch(`/api/blog/${blogData.id}`, {
			method: 'DELETE',
		});
		console.log(response);
		// Redirect to the homepage
		window.location.href = '/';
	});
}

// Given the raw code string, create an element to run the code with jDoodle API and output the result and return the element
const createCodeRunElement = (rawCodeString, language) => {
	const codeRunDiv = document.createElement('div');

	// Create a div to display the output of the code
	const outputDiv = document.createElement('pre');
	outputDiv.classList.add('bg-purple-100', 'rounded-lg', 'p-2', 'mt-1', 'hidden');

	// Create a button to run the code
	const runCodeButton = document.createElement('button');
	runCodeButton.classList.add('rounded-full', 'bg-purple-300', 'border-8', 'border-purple-300', 'mt-1', 'text-purple-800');
	if (loggedIn) {
		runCodeButton.addEventListener('click', async () => {
			// Send a POST request to the jDoodle API endpoint
			const response = await fetch('/api/jdoodle', {
				method: 'POST',
				body: JSON.stringify({ script: rawCodeString, language }),
				headers: { 'Content-Type': 'application/json' },
			});
			// Get response JSON
			const responseJSON = await response.json();
			// Check if responseJSON has a output property and if so, use that as the output
			if (responseJSON.output) {
				outputDiv.textContent = responseJSON.output;
			} else if (responseJSON.error) {
				outputDiv.textContent = responseJSON.error;
			} else {
				outputDiv.textContent = 'Something went wrong';
			}
			outputDiv.classList.remove('hidden');
		});
		runCodeButton.textContent = 'Run Code';
	} else {
		runCodeButton.disabled = true;
		runCodeButton.textContent = 'Log in to run code';
	}

	// Append the button and output div to the codeRunDiv and return it
	codeRunDiv.appendChild(runCodeButton);
	codeRunDiv.appendChild(outputDiv);
	return codeRunDiv;
};

// Given the blogContent (string), parse it and return the HTML element to be rendered
const parseBlogContent = (blogContent, language, renderCodeRun = true) => {
	const outerDiv = document.createElement('div'); // Outer div to hold all elements
	if (!blogContent) {
		// There is no blog content
		return outerDiv;
	}
	if (blogContent.indexOf('\n') === -1) {
		// There are no new lines to parse
		outerDiv.textContent = blogContent;
		return outerDiv;
	}
	// Split the blogContent string into an array of strings, each string is a line and determine if it is a header or paragraph or code block
	const blogContentArray = blogContent.split('\n');
	// Loop through the array of strings and build the HTML elements
	const elements = [];
	for (let i = 0; i < blogContentArray.length; i++) {
		// Check if the string is a header (check from smallest to largest header)
		if (blogContentArray[i].startsWith('###')) {
			const header4 = document.createElement('h4');
			const trimmedText = blogContentArray[i].substring(3).trim();
			header4.textContent = trimmedText;
			header4.classList.add('text-xl');
			elements.push(header4);
		} else if (blogContentArray[i].startsWith('##')) {
			const header3 = document.createElement('h3');
			const trimmedText = blogContentArray[i].substring(2).trim();
			header3.textContent = trimmedText;
			header3.classList.add('text-2xl', 'font-semibold');
			elements.push(header3);
		} else if (blogContentArray[i].startsWith('#')) {
			const header2 = document.createElement('h2');
			const trimmedText = blogContentArray[i].substring(1).trim();
			header2.textContent = trimmedText;
			header2.classList.add('text-3xl', 'font-bold');
			elements.push(header2);
		} else if (blogContentArray[i].startsWith('```')) {
			// Check if the string is a code block
			const codeBlock = document.createElement('pre');
			codeBlock.classList.add('code-block', 'p-2');
			// Collect raw code block text to send to jDoodle API
			let rawCodeString = '';
			// Loop through the array of strings until the end of the code block
			let j = i + 1;
			while (j < blogContentArray.length && !blogContentArray[j].startsWith('```')) {
				// const codeLine = document.createElement('code');
				// codeLine.textContent = blogContentArray[j];
				rawCodeString += blogContentArray[j] + '\n';
				// codeBlock.appendChild(codeLine);
				j++;
			}
			codeBlock.textContent = rawCodeString;
			// Let highlight.js do syntax highlighting on the code block
			hljs.highlightElement(codeBlock);
			elements.push(codeBlock);
			i = j;
			// Add element to run code with jDoodle API if renderCodeRun is true
			if (renderCodeRun) {
				elements.push(createCodeRunElement(rawCodeString, language));
			}
		} else {
			// String is likely a paragraph
			const paragraph = document.createElement('p');
			paragraph.textContent = blogContentArray[i];
			elements.push(paragraph);
		}
	}
	// Append all the elements to the outer div
	elements.forEach((element) => {
		outerDiv.appendChild(element);
	});
	return outerDiv;
};

// Select blog-content id and append the parsed blog content to it
const blogContent = document.querySelector('#blog-content');
// Parse the blog content and append it to the blog-content div
blogContent.appendChild(parseBlogContent(blogData.blog_content, blogData.tags));

// Add event listener to the submit comment button
const submitCommentButton = document.querySelector('#comment-submit');
if (!loggedIn) {
	// If the user is not logged in, disable the submit comment button
	submitCommentButton.disabled = true;
} else {
	submitCommentButton.addEventListener('click', async () => {
		// Get the comment text
		const commentText = document.querySelector('#comment-content').value;
		if (commentText.length === 0) {
			// The comment text is empty, dont send a request
			return;
		}
		// Send a POST request to the comment endpoint
		const response = await fetch(`/api/comment`, {
			method: 'POST',
			body: JSON.stringify({ commentText: commentText, blog_id: blogData.id }),
			headers: { 'Content-Type': 'application/json' },
		});
		// Get the response JSON
		const responseJSON = await response.json();
		// Check if the response was ok
		if (!response.ok) {
			// Log the error
			console.log(responseJSON);
		} else {
			// Clear the input
			document.querySelector('#comment-content').value = '';
			// Reload the page to show the new comment
			window.location.reload();
		}
	});
}
