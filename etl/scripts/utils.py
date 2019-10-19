import json

from geojson import Feature, FeatureCollection, Point


def save_as_geojson(df):
    properties = df.columns.values
    geojson = {'type': 'FeatureCollection', 'features': []}
    for _, row in df.iterrows():
        feature = {'type': 'Feature',
                   'properties': {},
                   'geometry': {'type': 'Point',
                                'coordinates': []}}
        feature['geometry']['coordinates'] = row['coordinates']
        for prop in properties:
            feature['properties'][prop] = row[prop]
        geojson['features'].append(feature)

    with open('cities.geojson', 'w') as output_file:
        json.dump(geojson, output_file)
