import pandas as pd 

from scripts import add_greens

def test_calculate_green_percentage():
    data = {'Nr':['1', '2', '3'], 'Wahlberechtigte':[5, 10, 7], 'BÜNDNIS 90/DIE GRÜNEN':[4, 2, 6]} 
    election_results_df = pd.DataFrame(data) 
    result_df = add_greens.calculate_green_percentage(election_results_df)

    result = result_df['green_percentage'].iloc[0]
    expected = 80.0

    assert result == expected