const express = require('express');
const linkPreview = require("sa-link-preview");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.ORIGIN_ALLOWED || '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Allow', 'GET, POST');
    next();
});



const port = process.env.PORT || 3000;

app.get('/', async (req, res) => res.send('Link Prevue API v2.0.0'));

app.post('/preview', async (req, res) => {
    try {
        const preview = await linkPreview(req.body.url);
        const { url, image, title, description, siteName } = preview;
        return res.json({ title, description, image, url, siteName });
    } catch (error) {
        return res.status(400).json({ error });
    }
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))