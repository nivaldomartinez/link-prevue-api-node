import * as cheerio from 'cheerio';
import { getByProp, getEmptyData, isValidHttpUrl } from './utils';



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
  if (!isValidHttpUrl(url)) return Promise.reject({ message: 'You must add a valid url' });

  const response = await fetch(url)
  if (!response) return getEmptyData(url);
  if (response.status === 200) {
    const body = await response.text()
    return collectMeta(cheerio.load(body), url)
  }
  return getEmptyData(url);
}

export default linkPreview