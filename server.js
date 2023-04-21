const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
	secret: 'Super secret secret',
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

app.use(session(sess));

const hbs = exphbs.create({
	helpers: {
		json: function (context) {
			return encodeURIComponent(JSON.stringify(context));
		},
		matches: function (val1, val2) {
			return val1 === val2;
		},
		selectInput: function (val1, val2) {
			if (val1 === val2) {
				return 'selected';
			} else return '';
		},
		formatBlogText: function (text) {
			// Replace all occurrences of # and ` with an empty string
			const cleanedText = text.replace(/[#`]/g, '');

			// Replace markdown headings with spaces, so that they appear as regular text
			const formattedText = cleanedText.replace(/(#+)(.*)/g, '$2');

			return formattedText;
		},
	},
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Setup routing
app.use(routes);

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
});
