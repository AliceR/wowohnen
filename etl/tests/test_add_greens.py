import geopandas as gpd
from geopandas.testing import assert_geodataframe_equal
import pandas as pd 

from scripts import add_greens

def test_calculate_green_percentage():
    data = {'Nr':['1', '2', '3'], 'Wahlberechtigte':[5, 10, 7], 'BÜNDNIS 90/DIE GRÜNEN':[4, 2, 6]} 
    election_results_df = pd.DataFrame(data) 
    result_df = add_greens.calculate_green_percentage(election_results_df)

    result = result_df['green_percentage'].iloc[0]
    expected = 80.0

    assert result == expected


def test_join_geometrie_with_results():
    data = {'Nr':['1', '2', '3'], 'Wahlberechtigte':[5, 10, 7], 'BÜNDNIS 90/DIE GRÜNEN':[4, 2, 6], 'green_percentage': [80.0, 75.0, 23.0]} 
    election_results_df = pd.DataFrame(data) 
    
    features = [
    {
        "type": "Feature", "properties": {'RS': '1'}, 
        "geometry": {"type": "Polygon", "coordinates": [
            [[ -13.0,37.0],[-13.0,45.0],[-2.0,45.0],[-2.0,37.0],[-13.0,37.0]]]}},
    {
        "type": "Feature", "properties": {'RS': '2'}, 
        "geometry": {"type": "Polygon","coordinates":[
            [[5.0,37.0],[5.0,45.0],[15.0,45.0],[15.0,37.0],[5.0,37.0]]]}
    }
  ]
    geometrie_gdf = gpd.GeoDataFrame.from_features(features)

    results_gdf = add_greens.join_geometrie_with_results(
        geometrie_gdf, election_results_df)

    features = [
    {
        "type": "Feature", "properties": {'Nr': '1', 'green_percentage': 80.0}, 
        "geometry": {"type": "Polygon", "coordinates": [
            [[ -13.0,37.0],[-13.0,45.0],[-2.0,45.0],[-2.0,37.0],[-13.0,37.0]]]}},
    {
        "type": "Feature", "properties": {'Nr': '2', 'green_percentage': 75.0}, 
        "geometry": {"type": "Polygon","coordinates":[
            [[5.0,37.0],[5.0,45.0],[15.0,45.0],[15.0,37.0],[5.0,37.0]]]}
    }
  ]
    expected_gdf = gpd.GeoDataFrame.from_features(features)

    assert_geodataframe_equal(results_gdf, expected_gdf)