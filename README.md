# Link-Preview Backend with Node.js

[link-prevue](https://github.com/nivaldomartinez/link-prevue)

[link-prevue Demo](https://link-prevue.herokuapp.com/)

[link-prevue Demo Repo](https://github.com/nivaldomartinez/link-prevue-demo)

## Install deps

In the root project folder run the following command

```sh
$ npm install
```

and run

```sh
$ npm start
```

## Get a link preview

```sh
$ curl -d '{"url":"https://tasche.herokuapp.com/"}' -H "Content-Type: application/json" http://localhost:3000/preview
```

## Response

```js
{
    "title": "Tasche",
    "description": "Tasche te permite guardar links de lo que desees para que siempre lo tengas contigo",
    "image": "http://tasche.herokuapp.com/static/images/logo-blue.png",
    "url": "https://tasche.herokuapp.com/",
    "siteName": null
}
```

:heart: