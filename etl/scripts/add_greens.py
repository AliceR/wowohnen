"""
Manual steps

1. Download results Europawahl 2019 from 
    https://bundeswahlleiter.de/dam/jcr/095b092a-780e-45e1-aca9-caafe903b126/ew19_kerg.csv
2. Clean up table to retain only the fields we need
3. Calculate green part in percent of all entitled to vote
    (we consider people who could but did not vote as contraindicative)
4. Download geometries Verwaltungsgebiete 
    https://daten.gdz.bkg.bund.de/produkte/vg/vg250_ebenen/2018/vg250_12-31.utm32s.shape.ebenen.zip
5. Join relevant layer <VG250_KRS.shp> with table based on 'RS' and 'Nr.' in QGIS
6. Load cities.geojson in QGIS and 'Join Attributes By Location' to add the field with greens

"""
import json
from io import BytesIO
from zipfile import ZipFile

import geopandas as gpd
import pandas as pd
from pathlib import Path
import requests


def get_2019_european_election_results():
    raw_election_data_path = Path('data/ew19_kerg.csv')
    
    if not raw_election_data_path.is_file():
        url = 'https://bundeswahlleiter.de/dam/jcr/095b092a-780e-45e1-aca9-caafe903b126/ew19_kerg.csv'
        response = requests.get(url)
        with open(raw_election_data_path, 'wb') as f:
            f.write(response.content)
    
    return pd.read_csv(
        raw_election_data_path,
        sep=';',
        header=2,
        skiprows=[3,4],
        usecols=['Nr', 'Wahlberechtigte', 'BÜNDNIS 90/DIE GRÜNEN']
    )

def get_election_geometries():
    election_geometries_path = Path(
        'data/vg250_2018-12-31.utm32s.shape.ebenen/vg250_ebenen/VG250_KRS.shp')
    
    if not election_geometries_path.is_file():
        url = 'https://daten.gdz.bkg.bund.de/produkte/vg/vg250_ebenen/2018/vg250_12-31.utm32s.shape.ebenen.zip'
        response = requests.get(url)
        f = ZipFile(BytesIO(response.content))
        f.extractall('data')

    geometries_gdf = gpd.read_file(election_geometries_path)[['RS', 'geometry']]
    geometries_gdf['RS'] = geometries_gdf['RS'].astype(float)
    return geometries_gdf

def calculate_green_percentage(election_results_df):
    election_results_df['green_percentage'] = 100 / election_results_df['Wahlberechtigte'] * election_results_df['BÜNDNIS 90/DIE GRÜNEN']
    return election_results_df

def join_geometrie_with_results(geometries_gdf, results_df):
    return pd.merge(left=geometries_gdf,right=results_df, left_on='RS', right_on='Nr')[['geometry', 'Nr', 'green_percentage']]

if __name__ == '__main__':
    results_df = get_2019_european_election_results()
    results_with_percentage = calculate_green_percentage(results_df)
    geometries_gdf = get_election_geometries()
    results_gdf = join_geometrie_with_results(geometries_gdf, results_with_percentage)
    print(results_gdf)
