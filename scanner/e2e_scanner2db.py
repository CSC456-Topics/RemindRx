import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))) #add the parent directory to the path

from scanner.model import extract_text_from_label
from recommend.recommend2db import recommend2db

def scan_and_recommend(file_like_object):
    #dummy data for testing
    text = extract_text_from_label(file_like_object)
    name = "TestMed"
    refill_time = "2"
    refills = "1"
    amount = "10"

    recommended_times = recommend2db(text, name, refill_time, refills, amount)
    
    return recommended_times
'''
file_path = os.path.join(os.path.dirname(__file__), "images", "test_description.png") #file path for the test image
recommended_times = scan_and_recommend(file_path)
print(recommended_times)'''