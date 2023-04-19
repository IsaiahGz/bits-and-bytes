const source =
	'<form><label for="name">Name:</label><input type="text" id="name" name="name"><button id="submit-button">Submit</button></form>';
const template = Handlebars.compile(source);
const context = {};
const html = template(context);

document.getElementById('submit-button').innerHTML = html;
document.getElementById('submit-button').addEventListener('click', function (event) {
	event.preventDefault();

	const name = document.getElementById('name').value;
});
