import json

import pandas as pd
from pathlib import Path
from pandas.io.json import json_normalize
from geojson import Feature, FeatureCollection, Point


def get_cities_data():
    existing_cities_data = Path("../data/cities1000.zip")
    if existing_cities_data.is_file():
        data_source = existing_cities_data
    else:
        data_source = "http://download.geonames.org/export/dump/cities1000.zip"

    return pd.read_csv(
        data_source,
        sep="\t",
        header=None,
        names=[
            "id",
            "name",
            "asciiname",
            "alternativeNames",
            "lat",
            "lon",
            "featureClass",
            "featureCode",
            "country",
            "altCountry",
            "adminCode",
            "countrySubdivision",
            "municipality",
            "municipalitySubdivision",
            "population",
            "elevation",
            "dem",
            "tz",
            "lastModified",
        ],
        usecols=["id", "name", "lat", "lon", "country"],
    )


def save_as_geojson(cities_df):
    features = cities_df.apply(
        lambda row: Feature(
            geometry=Point((float(row["lon"]), float(row["lat"]))),
            properties={
                "id": row["id"],
                "name": row["name"],
                "population": None,
                "sunshine": None,
                "greens": None,
            },
        ),
        axis=1,
    ).tolist()

    feature_collection = FeatureCollection(features)

    with open("cities.geojson", "w") as f:
        json.dump(feature_collection, f)


def filter_cities_by_country(cities_df, country):
    return cities_df[cities_df["country"] == country]


def read_cities_geojson():
    with open("cities.geojson", "r") as f:
        feature_collection = pd.read_json(f)
        cities_df = json_normalize(feature_collection["features"])
        cities_df = cities_df[
            [
                "geometry.coordinates",
                "properties.id",
                "properties.name",
                "properties.population",
                "properties.sunshine",
                "properties.greens",
            ]
        ]
        cities_df.columns = [
            "coordinates",
            "id",
            "name",
            "population",
            "sunshine",
            "greens",
        ]

        return cities_df


if __name__ == "__main__":
    cities_df = get_cities_data()
    german_cities_df = filter_cities_by_country(cities_df, "DE")
    save_as_geojson(german_cities_df)
