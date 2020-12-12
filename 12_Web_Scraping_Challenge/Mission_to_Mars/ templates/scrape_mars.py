# Declare dependencies
from bs4 import BeautifulSoup
from splinter import Browser
from splinter.exceptions import ElementDoesNotExist
import pandas as pd
import requests as r
import time
import scrape
import os
import sys
os.path.dirname(sys.executable)


# Initialize browser
def scrape():
    # Choose executeable path to driver for Mac
    executeable_path = {"executeable_path" : "/Applications/anaconda3/envs/PythonData/bin"}
    browser = Browser("chrome", executeable_path, headless=False)
    browser.visit('http://www.google.com')
    
    # Scrape the [NASA Mars News Site](https://mars.nasa.gov/news/) 
    news_title, news_p = mars_news(browser)
    featured_image_url = image_url(browser)
    mars_weather = weather(browser)
    html_table1 = marsfacts()
    marsdict = mars_hemispheres(browser)
    data = {
            "Title" : news_title,
            "Paragraph" : news_p,
            "Image_Url" : featured_image_url,
            "Mars Weather" : mars_weather,
            "Mars_Facts" : html_table1,
            "Mars_Hemispheres" : marsdict
            }
    return mars_info = {}
    browser.quit()

    
# NASA Mars News
def scrape_mars_news(browser):
        url = "https://mars.nasa.gov/news"
        browser.visit(url)
        
        # Define html object
        html = browser.html 
        
        # Launch Beautiful Soup to parse html
        soup = BeautifulSoup(html, 'html.parser')
   
        # Retrieve the latest news title and assign to a variable
        article = soup.select_one('ul.item_list  li.slide')
        news_title = article.find('div', class_='content_title').text
        
        # Retrieve the latest news paragraph and assign to a variable
        news_p = soup.find('div', class_='article_teaser_body').text

        # Display scraped news title and paragraph
        mars_info['news_title'] = news_title
        mars_info['news_p'] = news_p
        
        return news_title, news_p

    browser.quit()


### JPL Mars Space Images - Featured Image
def scrape_mars_image(browser):
        imageurldic = {}
        image_url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
        browser.visit(image_url)

        # Define html object
        html_img = browser.html

        # Deploy Beautiful Soup to parse html
        soup = BeautifulSoup(html_img, 'html.parser')

        # Scrape background image
        featured_image_url = soup.find('article')['style'].replace('background-image: url(','').replace(');', '')[1:-1]

        # Define initial url
        initial_url = 'https://www.jpl.nasa.gov'

        # Connect main website with image
        featured_image_url = initial_url + featured_image_url

        # Display full link to featured image
        featured_image_url

        # Dictionary entry from featured image
        mars_info['featured_image_url'] = featured_image_url

        return mars_info
    finally:

        browser.quit()


### Mars Weather via Twitter
def weather(browser):
        url = 'https://twitter.com/marswxreport?lang=en'
        browse.visit(url)
        time.sleep(5)      

        # Define html object
        html = browser.html

        # Parse html with Beautiful Soup
        soup = BeautifulSoup(html, 'html.parser')

        # Find all tweets with Mars Weather as the data name
        #tweets = soup.find('o1', class_='stream-items')
        #mars_weather = tweets.find('p', class_="tweet-text").text

        #????????print(mars_weather)

        #Save the tweet text for the weather report 
        #as a variable called `mars_weather`.

        #* **Note: Twitter frequently changes how information is presented on their website. If you are having difficulty getting the correct html tag data, consider researching Regular Expression Patterns and how they can be used in combination with the .find() method.**
        #```python
        # Example:
        #mars_weather = 'Sol 1801 (Aug 30, 2017), Sunny, high -21C/-5F, low -80C/-112F, pressure at 8.82 hPa, daylight 06:09-17:55'

        browser.quit()

### Mars Facts
def mars_facts(browse):

    # Visit the Mars Facts webpage
    facts_url = 'https://space-facts.com/mars/'
    tables = pd.read_html(facts_url)
    table1 = table[0]
    html_table = table1.to_html(index=False)
    return html_table1

### Mars Hemispheres
def mars_hemispheres(browser):
    # # Visit the USGS Astrogeology site [here](https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars) 
    url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    browser.visit(url)
    html = browser.html
    soup = BeatifulSouth(html, 'html.parser')
    mars = soup.find_all('div', class_='item')
    main_url = 'https://astrogeology.usgs.gov'
    fullurl = ""
    mars_dict = []
    for Mar in Mars:
        # Error handling
        try:
            # Identify and return title of listing
            title = Mar.find('h3').text   
            link = Mar.a['href']
            combinedurl = mainurl+link
            browser.visit(combinedurl)
            html = browser.html
            soup = BeautifulSoup(html, 'html.parser')
            Hemiurl = soup.find('img', class_='wide-image')['src']
            fullurl = mainurl + Hemiurl
            # Print results and append to dictionary only if title and link are available
            #if (title and link and image):
            if (title and fullurl):
                #print('-------------')
                #print(title)
                print(fullurl)
                marsdict.append({"Title" : title, "Image_URL" : fullurl}) 
        except AttributeError as e:
            print(e)
    print("Dictionary: ",marsdict)      
    return marsdict

  
#* Save both the image url string for the full resolution hemisphere image, a
    #nd the Hemisphere title containing the hemisphere name. Use a Python dictionary to store the data using the keys `img_url` and `title`.

#```python
# Example:
#hemisphere_image_urls = [
#    {"title": "Valles Marineris Hemisphere", "img_url": "..."},
#    {"title": "Cerberus Hemisphere", "img_url": "..."},
#    {"title": "Schiaparelli Hemisphere", "img_url": "..."},
#    {"title": "Syrtis Major Hemisphere", "img_url": "..."},
#]
#```

#- - -






