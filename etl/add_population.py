import json

import pandas as pd
from geojson import Feature, FeatureCollection, Point

def download_population():
    return pd.read_csv(
        'http://download.geonames.org/export/dump/cities1000.zip',
        sep="\t",
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


if __name__ == '__main__':
    population_df = download_population()
