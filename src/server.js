import express from 'express';
import bodyParser from 'body-parser';
import { matchRoutes } from 'react-router-config';
import Routes from './client/routes';
import renderer from './helpers/renderer';
import store from './helpers/createStore';
const port = process.env.PORT || 3000;
const app = express();

// MIDDLEWARES
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get([ '/*/:param', '*' ], (req, res) => {
	const promises = matchRoutes(Routes, req.path)
		.map(({ route }) => (route.loadData ? route.loadData(store, ParamValue) : null))
		.map((promise) => {
			if (promise) {
				return new Promise((resolve, reject) => {
					promise.then(resolve).catch(resolve);
				});
			}
		});
	Promise.all(promises).then(() => {
		const context = {};
		const content = renderer(req, store, context);

		if (context.url) {
			return res.redirect(301, context.url);
		}
		if (context.notFound) {
			res.status(404);
		}
		res.send(content);
	});
});

app.listen(port, () => {
	console.log(`Running on Port ${port}`);
});
