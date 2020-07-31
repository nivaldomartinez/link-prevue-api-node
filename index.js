const express = require('express')
const linkPreview = require("sa-link-preview")
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


const port = process.env.PORT || 3000

app.get('/', async (req, res) => res.send('Link Prevue API v2.0.0'))

app.post('/preview', async (req, res) => {
    const preview = await linkPreview(req.body.url);
    const { url, image, title, description, siteName } = preview;
    return res.json({ title, description, image, url, siteName });
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))