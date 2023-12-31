import * as cheerio from 'cheerio';

type LinkPreview = {
    url: string
    image: string | null
    imageWidth: string | null
    imageHeight: string | null
    imageType: string | null
    title: string | null,
    description: string | null
    siteName: string | null
}

const getEmptyData = (url: string) => ({
    url,
    image: null,
    imageWidth: null,
    imageHeight: null,
    imageType: null,
    title: null,
    description: null,
    siteName: null
  } as LinkPreview)

  const getByProp = ($: cheerio.CheerioAPI, property: string) => $(`meta[name="${property}"]`)
  .first()
  .attr('content') || $(`meta[property="${property}"]`)
  .first()
  .attr('content') || null;

function collectMeta($: cheerio.CheerioAPI, url: string) {
  const res = {
    url,
    image: getByProp($, 'og:image'),
    imageWidth: getByProp($, 'og:image:width'),
    imageHeight: getByProp($, 'og:image:height'),
    imageType: getByProp($, 'og:image:type'),
    title: getByProp($, 'og:title') || $('title').text(),
    description: getByProp($, 'og:description'),
    siteName: getByProp($, 'og:site_name') || $('title').text()
  };
  return Promise.resolve(res);
}

const linkPreview = async (url: string) => {
    if (!url || url === '') return Promise.reject({ message: 'You must add a valid url' });
    if (!url.match(/^http(s)?:\/\/[a-z]+\.[a-z]+(.)+/i)) return Promise.resolve(getEmptyData(url));

    const headers = new Headers()
    headers.append('Content-Type', 'text/html; charset=UTF-8')
  
    const response = await fetch(url, { headers })
    if (!response) return getEmptyData(url);
    if (response.status === 200) {
        const buffer = await response.arrayBuffer()
        const decoder = new TextDecoder('iso-8859-1');
        const body = decoder.decode(buffer);
        return collectMeta(cheerio.load(body, { decodeEntities: true }), url)
    }
    return getEmptyData(url);
  }

  export default linkPreview