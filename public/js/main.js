const logoutButtonHandler = async (event) => {

		// Send a POST request to the API endpoint
		const response = await fetch('/api/user/logout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			// If successful, redirect the browser to the homepage
			document.location.replace('/');
		} else {
            console.log('Error logging out')
		}
	};

 document.querySelector('#logout-button').addEventListener('click', logoutButtonHandler);