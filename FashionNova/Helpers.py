from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from PIL import Image
from glob import glob

import os
import pandas as pd

def get_data_from_csv():
    data =  pd.read_csv('image_links.csv', sep=';')
    data = data.to_dict('list')
    images = list(zip(data['name'], data['link']))

    return images

def go_to_url(driver:WebDriver, url:str):
    while True:
        try:
            driver.get(url)
            break
        except:
            continue

def wait_till_clickable(driver:WebDriver, locator_strategy:str, locator_info:str):
    try:
        element = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((locator_strategy, locator_info))
        )
        return element
    except Exception as err:
        print(err)

def GetAllElements(driver:WebDriver, locator_strategy:str, locator_info:str):
    try:
        wait = WebDriverWait(driver, 10)
        print('Estoy harto')
        clickable_elements = wait.until(EC.visibility_of_all_elements_located((locator_strategy, locator_info)))
        print(f'There are {len(clickable_elements)} elements with that locator info.')
        return clickable_elements
    except Exception as err:
        print(err)
        
def convert_webp_to_png():
    webp_images = glob("images/*.webp")
    for img in webp_images:
        converted_img_name = img.split(sep="\\")[1].split(sep=".webp")[0] + ".png"  # Extrae solamente en el nombre del archivo
        Image.open(img).convert("RGB").save("images\\" + converted_img_name,"png")
        os.remove(img)

