// redux server render 暂时不开启
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import { Provider } from 'react-redux';
// import { RouterContext, match } from 'react-router';
// import configureStore from 'client/src/store/configureStore';
// import routes from 'client/src/routes';

function renderFullPage (html, initialState, user) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>王者荣耀封面图下载器</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,minimal-ui">
        <link rel="shortcut icon" href="../../../public/favicon.ico" type="image/x-icon">
        <link rel="stylesheet" href="/app-css.css"/>
        <link rel="stylesheet" href="/app-less.css"/>
      </head>
      <body>
        <div id="root">${html}</div>
        <script type="text/javascript" src="/app.js"></script>
      </body>
    </html>
  `;
}

function render (req, res) {
  if (process.env.NODE_ENV !== 'production') {
    res.set('Content-Type', 'text/html');
    return res.status(200).send(renderFullPage('', {}));
  } else {
    return res.render('index', { __html__: ''});
  }
}

module.exports = render;
