
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import re
from bs4 import BeautifulSoup
from geopy.geocoders import Nominatim
import os
import openai
from flask_sqlalchemy import SQLAlchemy
import pymysql

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root@localhost:3306/houseai'
db = SQLAlchemy(app)

class userdata(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return '<User %r>' % self.email
    
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    first_name = data['firstName']
    last_name = data['lastName']
    email = data['email']
    password = data['password']
    user = userdata(first_name=first_name, last_name=last_name, email=email, password=password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'})

def pros_and_cons(descriptions):
    openai.api_key = "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"

    response = openai.Completion.create(
    model="text-davinci-003",
    prompt="can you change this into pros and  cons for why this house is good or bad for a Goldsmiths Student:\n\n"+descriptions,
    temperature=0.7,
    max_tokens=205,
    top_p=1.0,
    frequency_penalty=0.0,
    presence_penalty=0.0
    )
    print(response.choices[0].text)
    return response.choices[0].text

def remove_uk_postcodes(address):
    parts = address.split(",")
    if len(parts) > 1:
        return ",".join(parts[:-1]).strip()
    else:
        return address.strip()

def get_info_from_url(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    price = soup.find(
        'div', class_='_1gfnqJ3Vtd1z40MlC0MzXu').get_text().strip()
    address = soup.find(
        'h1', class_='_2uQQ3SV0eMHL1P6t5ZDo2q').get_text().strip()
    dd_tags = soup.find_all('dd', class_='_1hV1kqpVceE9m-QrX_hWDN')
    # Select the third dd tag (index 2) to get the number of bathrooms
    if len(dd_tags) > 2:
        houseType = dd_tags[0].get_text().strip()
        rooms = dd_tags[1].get_text().strip()
        bathrooms = dd_tags[2].get_text().strip()
    else:
        bathrooms = "Unable to find the number of bathrooms."
    description = soup.find(
        'div', class_='STw8udCxUaBUMfOOZu0iL _3nPVwR0HZYQah5tkVJHFh5').get_text().strip()

    if price != '':
        numeric_price = int(re.findall(
            r'\d{1,3}(?:,\d{3})*(?:\.\d+)?', price)[0].replace(',', ''))
    else:
        numeric_price = None

    # Print the extracted data for each property
    cleaned_address = remove_uk_postcodes(address)

    locator = Nominatim(user_agent="myGeocoder")
    location = locator.geocode(cleaned_address)

    image_url = soup.find('meta', {'itemprop': 'contentUrl'})['content']
    if location:
        print("Latitude = {}, Longitude = {}".format(
            location.latitude, location.longitude))
        return numeric_price, address, cleaned_address, rooms, bathrooms, houseType, description, location.latitude, location.longitude, image_url
    else:
        return numeric_price, address, cleaned_address, rooms, bathrooms, houseType, description, None, None, image_url


# Function to calculate the transportation cost between two addresses
API_KEY = '31c52d104f1243b69be266afd6673517'
# Function to calculate the transportation cost between two addresses


def calculate_transportation_cost(origin_latlng, destination_latlng):
    # Make a request to the Journey Planner API to get the travel options between the two points
    response = requests.get(
        f'https://api.tfl.gov.uk/Journey/JourneyResults/{origin_latlng["lat"]},{origin_latlng["lng"]}/to/{destination_latlng["lat"]},{destination_latlng["lng"]}?nationalSearch=False&mode=tube,bus,dlr,tram&app_id=&app_key={API_KEY}')
    data = response.json()

    # Extract the cost of the trip from the response
    try:
        cost = data['journeys'][0]['fare']['totalCost']
        cost = cost/100
        return cost
    except:
        return 'Unable to find the transportation cost as Geocoding Failed.'


@app.route('/compare', methods=['POST'])
def compare():
    url1 = request.json['url1']
    url2 = request.json['url2']

    # Perform comparison logic here
    # For example, compare the HTML content of the two URLs
    # https://www.rightmove.co.uk/properties/132834020#/?channel=STU_LET

    url1_price, url1_address, url1_cleaned_address, url1_rooms, url1_bathrooms, url1_houseType, url1_description, url1_lat, url1_lng, url1_image_url = get_info_from_url(url1)
    url2_price, url2_address, url2_cleaned_address, url2_rooms, url2_bathrooms, url2_houseType, url2_description, url2_lat, url2_lng, url2_image_url = get_info_from_url(url2)

    url1_latlng = {'lat': url1_lat, 'lng': url1_lng}
    url2_latlng = {'lat': url2_lat, 'lng': url2_lng}
    destination_latlng = {'lat': 51.473910, 'lng': -0.033780}

    url1_transportation_cost = calculate_transportation_cost(
        url1_latlng, destination_latlng)
    url2_transportation_cost = calculate_transportation_cost(
        url2_latlng, destination_latlng)

    url1_mtransportation_cost = url1_transportation_cost*30
    url2_mtransportation_cost = url2_transportation_cost*30
    url1_atransportation_cost = url1_transportation_cost*365
    url2_atransportation_cost = url2_transportation_cost*365

    url1_pro_cons = pros_and_cons(url1_description)
    url2_pro_cons = pros_and_cons(url2_description)
    
    return jsonify({
        'url1Price': url1_price,
        'url1Address': url1_address,
        'url1CleanedAddress': url1_cleaned_address,
        'url1Rooms': url1_rooms,
        'url1HouseType': url1_houseType,
        'url1Bathrooms': url1_bathrooms,
        'url1Description': url1_pro_cons,
        'url1TransportCost': url1_transportation_cost,
        'url1MTransportCost': url1_mtransportation_cost,
        'url1ATransportCost': url1_atransportation_cost,
        'url1Lat': url1_lat,
        'url1Lng': url1_lng,
        'url1Image': url1_image_url,
        'url2Price': url2_price,
        'url2Address': url2_address,
        'url2CleanedAddress': url2_cleaned_address,
        'url2Rooms': url2_rooms,
        'url2HouseType': url2_houseType,
        'url2Bathrooms': url2_bathrooms,
        'url2Description': url2_pro_cons,
        'url2TransportCost': url2_transportation_cost,
        'url2MTransportCost': url2_mtransportation_cost,
        'url2ATransportCost': url2_atransportation_cost,
        'url2Lat': url2_lat,
        'url2Lng': url2_lng,
        'url2Image': url2_image_url
    })

if __name__ == '__main__':
    app.run(debug=True)
