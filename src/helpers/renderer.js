import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import Routes from './../client/routes';


export default (req, store, context) => {
    const content = renderToString(
        <Provider store={store}>
			<StaticRouter location={req.path} context={context}>
				<div>{renderRoutes(Routes)}</div>
			</StaticRouter>
            </Provider>
       
    )


	const helmet = Helmet.renderStatic();

	return `<html lang="en">
    <head>
        <meta charset="UTF-8">
        ${helmet.meta.toString()}
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        ${helmet.title.toString()}
        <link rel="stylesheet" type="text/css" href="http://localhost:3000/build/assets/css/styles.min.css">
        <link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet">
        <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.9/css/all.css" integrity="sha384-5SOiIsAziJl6AWe0HWRKTXlfcSHKmYV4RBF18PPJ173Kzn7jzMyFuTtk8JA7QQG1" crossorigin="anonymous">
    </head>
    <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${content}</div>
        <script>
            window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="http://localhost:3000/client_bundle.js"></script>
    </body>
  
</html>`;
};
