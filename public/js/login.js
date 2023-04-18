// Handle login form submit
const loginFormHandler = async (event) => {
	event.preventDefault();

	// Collect values from the login form
	const email = document.querySelector('#login-email').value.trim();
	const password = document.querySelector('#login-password').value.trim();

	if (email && password) {
		// Send a POST request to the API endpoint
		const response = await fetch('/api/user/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			// If successful, redirect the browser to the homepage
			document.location.replace('/');
		} else {
			// Err logging in, give error message from server response
			const errDiv = document.querySelector('#login-error');
			if (errDiv.classList.contains('hidden')) {
				errDiv.classList.remove('hidden');
			}
			// Get response JSON
			const responseJSON = await response.json();
			// Check if responseJSON has a message property and if so, use that as the error message
			if (responseJSON.message) {
				errDiv.children[0].textContent = responseJSON.message;
			} else {
				errDiv.children[0].textContent = response.statusText;
			}
		}
	}
};
document.querySelector('#login-form').addEventListener('submit', loginFormHandler);

// Handle signup form submit
const signupFormHandler = async (event) => {
	event.preventDefault();

	// Collect values from the signup form
	const username = document.querySelector('#register-username').value.trim();
	const email = document.querySelector('#register-email').value.trim();
	const password = document.querySelector('#register-password').value.trim();
	const confirmPassword = document.querySelector('#register-confirm-password').value.trim();

	const errDiv = document.querySelector('#register-error');

	// Check that the passwords match, if not, display an error message
	if (password !== confirmPassword) {
		if (errDiv.classList.contains('hidden')) {
			errDiv.classList.remove('hidden');
		}
		errDiv.children[0].textContent = 'Passwords do not match';
		return;
	}

	if (username && email && password) {
		// Send a POST request to the API endpoint
		const response = await fetch('/api/user', {
			method: 'POST',
			body: JSON.stringify({ username, email, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			// If successful, redirect the browser to the homepage
			document.location.replace('/');
		} else {
			// Err signing up, give error message from server response
			if (errDiv.classList.contains('hidden')) {
				errDiv.classList.remove('hidden');
			}
			// Get response JSON
			const responseJSON = await response.json();
			// Check if responseJSON has a message property and use that as the error message
			if (responseJSON.message) {
				errDiv.children[0].textContent = responseJSON.message;
			} else if (responseJSON.name === 'SequelizeValidationError') {
				// Check if SequelizeValidationError occurred and use the first error message
				errDiv.children[0].textContent = responseJSON.errors[0].message;
			} else {
				errDiv.children[0].textContent = response.statusText;
			}
		}
	}
};
document.querySelector('#register-form').addEventListener('submit', signupFormHandler);
