import json

from urllib.request import urlopen
import rasterio
import gzip
import io
from pyproj import Proj, transform


def download_sunshine():
    url = "https://opendata.dwd.de/climate_environment/CDC/grids_germany/annual/sunshine_duration/grids_germany_annual_sunshine_duration_201817.asc.gz"
    response = urlopen(url)
    compressed_file = io.BytesIO(response.read())
    decompressed_file = gzip.GzipFile(fileobj=compressed_file)

    return decompressed_file


def merge_sunshine_to_cities(sunshine_raster, cities_df):
    inProj = Proj(init='epsg:4326')
    outProj = Proj(init='epsg:31467')
    x1, y1 = 13.326416015624998, 52.50786308797268
    x2, y2 = transform(inProj, outProj, x1, y1)

    with rasterio.open(sunshine_raster) as raster_file:
        val = next(raster_file.sample([(x2, y2)]))
        print(val)
    return None


if __name__ == '__main__':
    sunshine_raster = download_sunshine()

    # cities_df = read_cities_geojson()
    cities_df = None
    cities_with_sunshine_df = merge_sunshine_to_cities(
        sunshine_raster, cities_df)
    #
    # save_as_geojson(cities_with_sunshine_df)
