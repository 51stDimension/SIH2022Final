from pickletools import long4
from flask import Flask, send_file, request, json, jsonify
import xlrd
import random
import pandas as pd
import seaborn as sns
import geopandas as gpd
import matplotlib.pyplot as plt
from os import environ
import time
import pickle
import folium
import numpy as np
from geopy.geocoders import Nominatim
from csv import writer
app = Flask(__name__)
with open('d.pkl', 'rb') as f:
      x = pickle.load(f)

# http://127.0.0.1:5000/getmap?state=Maharashtra&case=Murder
# http://127.0.0.1:5000/getcoord?district=Adilabad
@app.route('/getcoord')
def get_coord():
    distName = request.args.get('district')
    return jsonify(
        lat=x[distName][0],
        long=x[distName][1]
    )

@app.route('/gethotspot')
def get_map():

    lat = request.args.get('lat')
    long = request.args.get('long')
    crimeType = request.args.get('crime')

    geolocator = Nominatim(user_agent="geoapiExercises")

    location = geolocator.reverse(lat+","+long)
    address = location.raw['address']
    stateName = address.get('state','')
   
    df = pd.read_excel('Crime - Copy.xlsx')
    locs = pd.read_csv('locs.csv')  
    loc = Nominatim(user_agent="GetLoc")

    def get_state_loc(state):
        try:
            getLoc = loc.geocode(state)
            return [getLoc.latitude, getLoc.longitude]
        except Exception:
            return [0, 0]

    def get_district_loc(city):
        l = locs[locs['District'] == city][['Latitude', 'Longitude']]
        if len(l) != 0:
            return [(l.values)[0][0],(l.values)[0][1]]
        r = get_state_loc(city)
        with open('locs.csv', 'a', newline='') as f_object:
            writer_object = writer(f_object)
            writer_object.writerow([city] + r)  
            f_object.close()
        return r
    
    tooltip = "You are here!"

    def get_plot(state,stationLat,stationLong, crime):
        map = folium.Map(location=get_state_loc(state), zoom_start=7, tiles='CartoDB positron')
        pv = df[['States/UTs', 'District', crime]][df['States/UTs'] == state]
        pv['Locations'] = pv['District'].apply(lambda x: get_district_loc(x))
        pv.sort_values(crime, ascending=False,inplace=True)
        pv.drop_duplicates(subset='District', inplace=True)
        folium.CircleMarker(location=[stationLat,stationLong],radius=90,fill=True,color='blue').add_to(map)

        for i in range(len(pv)):
            folium.CircleMarker(
                location=pv['Locations'].iloc[i], 
                tooltip = pv['District'].iloc[i], 
                radius= float(pv[crime].iloc[i]/5),
                fill = True, color='red').add_to(map)

        folium.Marker(location=[stationLat,stationLong],tooltip=tooltip).add_to(map) 
        
        return map._repr_html_()
    
    return get_plot(stateName,lat,long,crimeType)

@app.route('/getmap')
def get_image():

    stateName = request.args.get('state')
    crimeName = request.args.get('case')

    sns.set_style('whitegrid')

    pd.set_option('display.float_format', lambda num:'%1.3f'%num)
    pd.set_option('display.max_rows', None)
    pd.set_option('display.max_columns', None)

    df = pd.read_excel('Crime.xlsx')

    fp = "gadm36_IND_shp/gadm36_IND_2.shp"
    map_df = gpd.read_file(fp)

    map_df = map_df[['NAME_1', 'NAME_2', 'geometry']]
    
    map_df = map_df[map_df['NAME_1']==stateName]

    map_df["rep"] = map_df["geometry"].representative_point()
    za_points = map_df.copy()

    district_wise = df[['States/UTs', 'District', crimeName]]
    district_wise = district_wise[district_wise['States/UTs']==stateName]

    merged = map_df.set_index('NAME_2').join(district_wise.set_index('District'))

    merged.dropna(inplace = True)

    fig, ax = plt.subplots(1, figsize=(10, 6))
    ax.axis('off')


    za_points.set_geometry("rep", inplace = True)

    merged.plot(column=crimeName, cmap='YlOrRd', linewidth=0.8, ax=ax, edgecolor='0.8', legend=True)

    texts = []

    for x, y, label in zip(za_points.geometry.x, za_points.geometry.y, za_points["NAME_2"]):
        texts.append(plt.text(x, y, label, fontsize = 8))

    stateMap = plt.gcf()
    # plt.show()
    stateMap.savefig('chart.png')
    time.sleep(2)
    filename = 'chart.png'

    return send_file(filename, mimetype='image/gif')