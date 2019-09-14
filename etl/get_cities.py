import json

import pandas as pd
from pandas.io.json import json_normalize
from geojson import Feature, FeatureCollection, Point


def download_cities():
    return pd.read_csv(
        'http://download.geonames.org/export/dump/cities1000.zip',
        sep='\t',
        header=None,
        names=['id',
               'name',
               'asciiname',
               'alternativeNames',
               'lat',
               'lon',
               'featureClass',
               'featureCode',
               'country',
               'altCountry',
               'adminCode',
               'countrySubdivision',
               'municipality',
               'municipalitySubdivision',
               'population',
               'elevation',
               'dem',
               'tz',
               'lastModified'],
        usecols=['id', 'name', 'lat', 'lon']
    )


def save_as_geojson(cities_df):
    features = cities_df.apply(
        lambda row: Feature(
            geometry=Point(
                (float(row['lon']), float(row['lat']))),
            properties={'id': row['id'], 'name': row['name']}),
        axis=1).tolist()

    feature_collection = FeatureCollection(features)

    with open('cities.geojson', 'w') as f:
        json.dump(feature_collection, f)


def read_cities_geojson():
    with open('cities.geojson', 'r') as f:
        feature_collection = pd.read_json(f)
        cities_df = json_normalize(feature_collection['features'])
        cities_df = cities_df[['geometry.coordinates',
                               'properties.id', 'properties.name']]
        cities_df.columns = ['coordinates', 'id', 'name']

        return cities_df


if __name__ == '__main__':
    cities_df = download_cities()
    save_as_geojson(cities_df)
