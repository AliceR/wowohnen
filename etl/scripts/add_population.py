import json

import pandas as pd
from pathlib import Path
from geojson import Feature, FeatureCollection, Point

from get_cities import read_cities_geojson
from utils import save_as_geojson


def get_population_data():
    existing_population_data = Path('../data/cities1000.zip')
    if existing_population_data.is_file():
        data_source = existing_population_data
    else:
        data_source = 'http://download.geonames.org/export/dump/cities1000.zip'

    return pd.read_csv(
        data_source,
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
        usecols=['id', 'population']
    )


def merge_population_to_cities(population_df, cities_df):
    cities_df.drop('population', axis=1, inplace=True)
    return pd.merge(cities_df, population_df, how='inner', on='id')


if __name__ == '__main__':
    population_df = get_population_data()
    cities_df = read_cities_geojson()

    cities_with_population_df = merge_population_to_cities(
        population_df, cities_df)

    save_as_geojson(cities_with_population_df)
