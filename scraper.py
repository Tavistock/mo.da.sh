import requests
from bs4 import BeautifulSoup
import json

def get_pic_urls():
    urllist = []
    for page in range(38):
        url = "http://unsplash.com/page/"+ str(page+1)
        request = requests.get(url)
        posts = BeautifulSoup(request.text)
        for post in posts.find_all(class_="photo_div"):
            urllist.append(post.a["href"])
    with open("urls.js", "w") as js_file:
        json.dump({"url":urllist}, js_file, indent=2)

if __name__ == '__main__':
    get_pic_urls()
