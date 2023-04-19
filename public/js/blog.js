// Given the raw code string, create an element to run the code with jDoodle API and output the result and return the element
const createCodeRunElement = (rawCodeString, language) => {
	const codeRunDiv = document.createElement('div');

	// Create a div to display the output of the code
	const outputDiv = document.createElement('div');

	// Create a button to run the code
	const runCodeButton = document.createElement('button');
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
	});
	runCodeButton.textContent = 'Run Code';

	// Append the button and output div to the codeRunDiv and return it
	codeRunDiv.appendChild(runCodeButton);
	codeRunDiv.appendChild(outputDiv);
	return codeRunDiv;
};

// Given the blogContent (string), parse it and return the HTML element to be rendered
const parseBlogContent = (blogContent, language, renderCodeRun = true) => {
	const outerDiv = document.createElement('div'); // Outer div to hold all elements
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
			elements.push(header4);
		} else if (blogContentArray[i].startsWith('##')) {
			const header3 = document.createElement('h3');
			const trimmedText = blogContentArray[i].substring(2).trim();
			header3.textContent = trimmedText;
			elements.push(header3);
		} else if (blogContentArray[i].startsWith('#')) {
			const header2 = document.createElement('h2');
			const trimmedText = blogContentArray[i].substring(1).trim();
			header2.textContent = trimmedText;
			elements.push(header2);
		} else if (blogContentArray[i].startsWith('```')) {
			// Check if the string is a code block
			const codeBlock = document.createElement('pre');
			codeBlock.classList.add('code-block');
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
