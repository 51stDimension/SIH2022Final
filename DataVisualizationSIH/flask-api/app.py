from flask import Flask, send_file, request
import xlrd
import random
import pandas as pd
import seaborn as sns
import geopandas as gpd
import matplotlib.pyplot as plt
from os import environ
import time

app = Flask(__name__)

# http://127.0.0.1:5000/getmap?state=Maharashtra&case=Murder
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

    district_wise = df[['States/UTs', 'District', crimeName]]
    district_wise = district_wise[district_wise['States/UTs']==stateName]

    merged = map_df.set_index('NAME_2').join(district_wise.set_index('District'))

    merged.dropna(inplace = True)

    fig, ax = plt.subplots(1, figsize=(10, 6))
    ax.axis('off')

    merged.plot(column=crimeName, cmap='YlOrRd', linewidth=0.8, ax=ax, edgecolor='0.8', legend=True)
    stateMap = plt.gcf()
    # plt.show()
    stateMap.savefig('chart.png')
    time.sleep(2)
    filename = 'chart.png'

    return send_file(filename, mimetype='image/gif')