# Declare dependencies
from bs4 import BeautifulSoup
from splinter import Browser
import pandas as pd
import requests as r
import time
import scrape

def get_population(url, parameter_list):
    """"
    gets dataframes from url passed
    inputs: url
    outputs: objects
    """
    result = r.get(url)

    df_pop=pd.DataFrame()
    
    if result.status_code==200:
        result=result.text
        df_pop=pd.read_html(url)

    pass


# Initialize browser
def init_browser():

    browser = Browser("chrome", executeable_path, headless=False)

    ### NASA Mars News

    # Scrape the [NASA Mars News Site](https://mars.nasa.gov/news/) 
    news_title, news_p = scrape_mars_news()

    # Choose executeable path to driver for Mac
    # executeable_path = {"executeable_path" : "/Applications/anaconda3/envs/PythonData/bin"}
    mars_info = {
        "news_title" : news_title,
        "news_p" : news_p
    }

return mars_info

finally:
    browser.quit()

### Create Mission to Mars dictionary to import to Mongo
mars_info = {}

# NASA Mars News
def scrape_mars_news():
    
    try:
        # Initialize browser
        browser = init_browser()

        # Connect to NASA url via splinter
        url = "https://mars.nasa.gov/news"
        browser.visit(url)

        # Define html object
        html = browser.html
        # html

        # Deploy Beautiful Soup to parse html
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

finally:
    browser.quit()


### JPL Mars Space Images - Featured Image
def scrape_mars_image():
    try:
        # Initialize browser
        browser = init_browser()

        # Connect with JPL Featured Space Image url
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

        browser.quit


### Mars Weather via Twitter
def scrape_mars_weather():

    try:

        # Initalize browser
        browser - init_browser()

        # Visit the Mars Weather twitter account via Splinter
        url = 'https://twitter.com/marswxreport?lang=en'
        browse.visit(url)
        time.sleep(1)

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
def scrape_mars_facts():

    # Visit the Mars Facts webpage
    facts_url = 'https://space-facts.com/mars/'

    # Use Pandas to scrape the table containing facts about the planet including Diameter, Mass, etc.
    mars_facts = pd.read_html(facts_url)
    mars_facts

    #* Use PANDAS to convert the data to a HTML table string.

    # Create Mars Dataframe
    mars_df= mars_facts[0]
    mars_df

    # Define columns
    mars_df.columns = ["Description", "Value"]
    mars_df.set_index("Description", inplace=True)
    mars_df

    # Set the index to the Description column without row indexing
    mars_df.set_index('Description', inplace=True)

    # Save html code to folder
    data = mars_df.to_html()

    # Dictionary entry from Mars Facts
    mars_info['mars_facts'] = data
    
    return mars_info

### Mars Hemispheres
def scrape_mars_hemispheres():

    try:

     # Initialize browser
     browser = init_browser()

     # # Visit the USGS Astrogeology site [here](https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars) 
    url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"

    browser.visit(url)

    # Obtain high resolution images for each of Mar's hemispheres.
    hemisphere_image_urls = []

# Create a list of all the hemispheres
links = browser.find_by_css("a.product-item h3")
for item in range (len(links)):
    hemisphere = {}

    # Loop through links
    browser.find_by_css("a.product-item h3")[item].click()

    # Isolate sample image a-tag and <href>
    sample_element = browser.find_link_by_text("Sample").first
    hemisphere["img_url"] = sample_element["href"]

    # Locate hemisphere titles
    hemisphere["title"] = browser.find_by_css("h2.title").text

    #* Append the dictionary with the image url string and the hemisphere title to a list. 
    # This list will contain one dictionary for each hemisphere.
    hemisphere_image_urls.append(hemisphere)

    # Define browser
    browser.back()

hemisphere_image_urls

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






