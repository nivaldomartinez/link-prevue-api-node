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

export const getEmptyData = (url: string) => ({
    url,
    image: null,
    imageWidth: null,
    imageHeight: null,
    imageType: null,
    title: null,
    description: null,
    siteName: null
} as LinkPreview)

function isValidHostname(hostname: string): boolean {
    // IPv4 pública
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
        return hostname
            .split(".")
            .every(octet => Number(octet) >= 0 && Number(octet) <= 255)
    }

    // Dominio con TLD real
    return /^(?!-)(?:[a-z0-9-]{1,63}\.)+[a-z]{2,}$/i.test(hostname)
}


function isPrivateHost(hostname: string) {

    if (hostname === "localhost") return true

    // IPv4 privada
    if (/^(10\.|127\.|169\.254\.|192\.168\.)/.test(hostname)) return true
    if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)) return true

    // IPv6 localhost / privada
    if (hostname === "::1") return true
    if (hostname.startsWith("fc") || hostname.startsWith("fd")) return true

    return false
}


export function isValidHttpUrl(value: string): boolean {
    if (!value || value === '') return false;

    let url
    try {
        url = new URL(value)
    } catch {
        return false
    }

    if (url.protocol !== "http:" && url.protocol !== "https:") {
        return false
    }

    if (!url.hostname) return false

    if (isPrivateHost(url.hostname)) return false

    if (!isValidHostname(url.hostname)) return false

    return true
}

export const getByProp = ($: cheerio.CheerioAPI, property: string) => $(`meta[name="${property}"]`)
    .first()
    .attr('content') || $(`meta[property="${property}"]`)
        .first()
        .attr('content') || null;