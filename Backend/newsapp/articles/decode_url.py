# import base64
# from urllib.parse import urlparse, urlunparse

# def decode_google_news_url(source_url):
#     path = source_url.replace('https://news.google.com/rss/articles/', '').split('?')[0]

#     while (len(path) % 4 != 0):
#         path += '='
#     decoded = base64.b64decode(path)
    
#     try:
#         decoded_str = decoded.decode('utf-8')
#     except UnicodeDecodeError:
#         decoded_str = decoded.decode('latin1')
#         url = decoded_str.split(" ")[0]
#     return url
 
# # Example usage:
# def main():
#     source_url = 'https://news.google.com/rss/articles/CBMiX2h0dHBzOi8vd3d3LmNiYy5jYS9zcG9ydHMvb2x5bXBpY3Mvc3VtbWVyL3Jvd2luZy9vbHltcGljcy1wYXJpcy1kYXktMi1yb3VuZHVwLWp1bHktMjktMS43Mjc4NDA50gEgaHR0cHM6Ly93d3cuY2JjLmNhL2FtcC8xLjcyNzg0MDk?oc=5'
#     url = decode_google_news_url(source_url)

# main()

import requests
import base64

def fetch_decoded_batch_execute(id):
    s = (
        '[[["Fbv4je","[\\"garturlreq\\",[[\\"en-US\\",\\"US\\",[\\"FINANCE_TOP_INDICES\\",\\"WEB_TEST_1_0_0\\"],'
        'null,null,1,1,\\"US:en\\",null,180,null,null,null,null,null,0,null,null,[1608992183,723341000]],'
        '\\"en-US\\",\\"US\\",1,[2,3,4,8],1,0,\\"655000234\\",0,0,null,0],\\"'
        + id
        + '\\"]",null,"generic"]]]'
    )

    headers = {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        "Referer": "https://news.google.com/",
    }

    response = requests.post(
        "https://news.google.com/_/DotsSplashUi/data/batchexecute?rpcids=Fbv4je",
        headers=headers,
        data={"f.req": s},
    )

    if response.status_code != 200:
        raise Exception("Failed to fetch data from Google.")

    text = response.text
    header = '[\\"garturlres\\",\\"'
    footer = '\\",'
    if header not in text:
        raise Exception(f"Header not found in response: {text}")
    start = text.split(header, 1)[1]
    if footer not in start:
        raise Exception("Footer not found in response.")
    url = start.split(footer, 1)[0]
    return url


def decode_google_news_url(source_url):
    url = requests.utils.urlparse(source_url)
    path = url.path.split("/")
    if url.hostname == "news.google.com" and len(path) > 1 and path[-2] == "articles":
        base64_str = path[-1]
        decoded_bytes = base64.urlsafe_b64decode(base64_str + "==")
        decoded_str = decoded_bytes.decode("latin1")

        prefix = b"\x08\x13\x22".decode("latin1")
        if decoded_str.startswith(prefix):
            decoded_str = decoded_str[len(prefix) :]

        suffix = b"\xd2\x01\x00".decode("latin1")
        if decoded_str.endswith(suffix):
            decoded_str = decoded_str[: -len(suffix)]

        bytes_array = bytearray(decoded_str, "latin1")
        length = bytes_array[0]
        if length >= 0x80:
            decoded_str = decoded_str[2 : length + 1]
        else:
            decoded_str = decoded_str[1 : length + 1]

        if decoded_str.startswith("AU_yqL"):
            return fetch_decoded_batch_execute(base64_str)

        return decoded_str
    else:
        return source_url