import mysql.connector
import sys
import requests
import re
import geopy.geocoders
import requests
import urllib.parse
from geopy.geocoders import Nominatim
from bs4 import BeautifulSoup

# connect to the MySQL server
cnx = mysql.connector.connect(user='root', password='Zatsatheman123', host='localhost', database='houseai')

def remove_uk_postcodes(address):
    parts = address.split(",")
    if len(parts) > 1:
        return ",".join(parts[:-1]).strip()
    else:
        return address.strip()

    # Define a regular expression to match UK postcodes
    # uk_postcode_regex = r'\b[A-Za-z]{1,2}\d{1,2}[A-Za-z]?\s?\d[A-Za-z]{2}\b'
    
    # Remove any matches of UK postcodes from the address
    # cleaned_address = re.sub(uk_postcode_regex, '', address)
    
    #return cleaned_address

i = 1
for page in range(0, 37):
    index = page * 24
    
    # URL of the Rightmove page to scrape
    url = 'https://www.rightmove.co.uk/student-accommodation/find.html?locationIdentifier=REGION%5E87490&index=' + str(index) + '&propertyTypes=&mustHave=&dontShow=&furnishTypes=&keywords='
    # Make a GET request to the URL
    response = requests.get(url)

    # Parse the HTML content of the page using BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')

    # Find all property listings on the page
    listings = soup.find_all('div', class_='propertyCard-wrapper')

    # Loop through each property listing and extract data
    for listing in listings:
        # Extract the property price
        price = listing.find('span', class_='propertyCard-priceValue').text.strip()

        # Extract the property address
        address = listing.find('address', class_='propertyCard-address').text.strip()
        
        rooms = listing.find("h2", class_="propertyCard-title").get_text().strip()

        # Extract the property description


        
        # Extract the property description
        
        if price != '':
            numeric_price = int(price.replace('£', '').replace(',', '').replace('pcm', '').strip())  # convert to numeric value

        else:
            numeric_price = None

        numeric_filter = filter(str.isdigit, rooms)
        processed_rooms = "".join(numeric_filter)
        if processed_rooms == '':
            processed_rooms = 0
        else:
            processed_rooms = processed_rooms
        
        # Print the extracted data for each property
        cleaned_address = remove_uk_postcodes(address)

        # Print the extracted data for each property
        locator = Nominatim(user_agent= "myGeocoder")
        location = locator.geocode(cleaned_address)

        
        url = 'https://nominatim.openstreetmap.org/search/' + cleaned_address +'?format=json'
        response = requests.get(url).json()
        
        
        print(i)
        i=i+1
        print('Price:', price)
        print('Address:', address)
        print('Cleaned Address:', cleaned_address)
        try:
            print(response[0]["lat"])
            print(response[0]["lon"])
        except (KeyError, IndexError) as e:
            print("API failed for address {address}: {type(e).__name__}: {e}")    
        try:
            print("Latitude = {}, Longitude = {}".format(location.latitude, location.longitude))
        except AttributeError:
            print("Geocoding failed for address:", cleaned_address)
        print('Rooms', processed_rooms)
        print('---')
        if location is not None:
            data = (address, numeric_price, processed_rooms,location.latitude, location.longitude)
            # rest of the code
            # define the SQL query to insert data
            query = "INSERT INTO housedata (address, price, rooms, latitude, longitude) VALUES (%s, %s, %s, %s, %s)"

            # execute the SQL query to insert data
            cursor.execute(query, data)

            # commit the changes to the database
            cnx.commit()
        else:
            print("Error: location is not defined")

# close the cursor and database connection
cursor.close()
cnx.close()
# create a cursor object
cursor = cnx.cursor()