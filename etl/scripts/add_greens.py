"""
Manual steps

1. Download results Europawahl 2019 from https://bundeswahlleiter.de/dam/jcr/095b092a-780e-45e1-aca9-caafe903b126/ew19_kerg.csv
2. Clean up table to retain only the fields we need
3. Calculate green part in percent of all entitled to vote
    (we consider people who could but did not vote as contraindicative)
4. Download geometries Verwaltungsgebiete https://daten.gdz.bkg.bund.de/produkte/vg/vg250_ebenen/2018/vg250_12-31.utm32s.shape.ebenen.zip
5. Join relevant layer <VG250_KRS.shp> with table based on 'RS' and 'Nr.' in QGIS
6. Load cities.geojson in QGIS and 'Join Attributes By Location' to add the field with greens

"""
import json

import pandas as pd
from pathlib import Path


def get_2019_european_election_results():
    raw_election_data = Path('data/ew19_kerg.csv')
    if raw_election_data.is_file():
        url = 'data/ew19_kerg.csv'
    else:
        url = 'https://bundeswahlleiter.de/dam/jcr/095b092a-780e-45e1-aca9-caafe903b126/ew19_kerg.csv'
    return pd.read_csv(
        url,
        sep=';',
        header=2,
        usecols=['Nr', 'Wahlberechtigte', 'BÜNDNIS 90/DIE GRÜNEN']
    )

def calculate_green_percentage(election_results_df):
    election_results_df['green_percentage'] = 100 / election_results_df['Wahlberechtigte'] * election_results_df['BÜNDNIS 90/DIE GRÜNEN']
    return election_results_df

if __name__ == '__main__':
    results_df = get_2019_european_election_results()
    print(results_df)
