from scripts import add_greens

def test_calculate_green_part_percentage():
    expected_percentage_green_part_germany = 34
    result_percentage_green_part_germany = add_greens.calculate_green_part_percentage()
    assert expected_percentage_green_part_germany == result_percentage_green_part_germany