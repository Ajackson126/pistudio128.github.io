# Tutor ---> data = scrape_mars.init_browser()
# Tutor ---> db.update({},data, upsert =True)


# Import libraries
from flask import Flask, render_template

# Import our pymongo library, which connects Flask app to Mongo database
import pymongo
import scrape
import o

# Create route that renders index.html template and finds documents from mongo
@app.route("/")
def home(): 
    
# Create an instance of Flask
app = Flask(__name__)

# Create connection variable ---> ???
app.config["MONGO_URI"] = os.environ.get('authentificaiton')
mongo = PyMongo(app)

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to mars database. Will create one if not already available
db = client.mars_db

# Drops collection if available to remove duplicates
collection = db.mars_data_entries


# Set routes
@app.route('/')
def home():
    # Store the mars collection in a list
    mars_data = list(db.collection.find())[0]
    return render_template('index.html', mars_data=mars_data)

    # Return the template with the mars list passed in
    return render_template('index.html', mars_data=mars_data)


if __name__ == "__main__":
    app.run(debug=True)