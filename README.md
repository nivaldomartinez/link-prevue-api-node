# Link-Preview API cloudflare/workers

[link-prevue](https://github.com/nivaldomartinez/link-prevue)

[link-prevue Demo](https://link-prevue.herokuapp.com/)

[link-prevue Demo Repo](https://github.com/nivaldomartinez/link-prevue-demo)

## Install deps

In root project folder run the following command

```sh
$ bun install
```

and run

```sh
$ bun run dev
```

## Get a link preview

```sh
$ curl --location 'https://link-preview-api.nivaldo.workers.dev/preview?url=https://bun.sh/'
```

## Response

```js
{
    "title": "Bun — A fast all-in-one JavaScript runtime",
    "description": "Bundle, install, and run JavaScript & TypeScript — all in Bun. Bun is a new JavaScript runtime with a native bundler, transpiler, task runner, and npm client built-in.",
    "image": "https://bun.sh/share_v3.png",
    "url": "https://bun.sh",
    "siteName": "Bun"
}
```

:heart:

Alternative
[siddhigate/link-preview](https://github.com/siddhigate/link-preview)