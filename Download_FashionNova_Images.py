from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.edge.options import Options
from selenium.webdriver.remote.webdriver import WebDriver
import pandas as pd
import urllib.request
from PIL import Image
from glob import glob
import os

from FashionNova.Helpers import convert_webp_to_png, get_data_from_csv, go_to_url, wait_till_clickable


def main():
    # Get urls of the items in x Shein order. Convert the data in a dictionery sku:name from the dataframe
    data =  get_data_from_csv()

    edge_options = Options()
    edge_options.add_argument('--log-level=3')
    driver = webdriver.Edge(options=edge_options)
    driver.implicitly_wait(15)
    driver.maximize_window()

    for name, url in data:
        print(url)
        sleep(3)
        go_to_url(driver, url)        
        download_images(driver, name)
    
    driver.close()
    convert_webp_to_png()


def download_images(driver:WebDriver, image_name):
    sleep(2)  
    try:                                                        
        coupon_close_bt = wait_till_clickable(driver, By.XPATH, '//*[@id="bx-close-inside-1848842"]')
        coupon_close_bt.click()    
        location_modal_bt = wait_till_clickable(driver, By.XPATH, '/html/body/div[2]/div[1]/div/div/button[2]')
        location_modal_bt.click() 
        sleep(3)
    except:
        print("Error al cerrar cupon")
        pass
    
    try:
        miniatures = driver.find_elements(By.XPATH, f'/html/body/div[2]/main/div/div[1]/div[1]/div[2]/div/div')
    except:
        input("No se encontraron miniaturas")

    # Hover over miniatures to load all images
    global close_button_div
    counter = 0
    close_button_div = 9
    for miniature in miniatures:           
        miniature.click()                                             
        # input("Click en miniatura")     /html/body/div[2]/main/div/div[1]/div[1]/div[3]/div[3]/div/div/div[2]
        driver.find_element(By.XPATH, f'/html/body/div[2]/main/div/div[1]/div[1]/div[3]/div[{counter+1}]/div/div/div[2]').click() # Click to full image              
        close_button = get_close_button(driver)
        
        image_xpath = f'//*[@id="pswp__items"]/div[2]/div/img'
        full_image_url = driver.find_element(By.XPATH, image_xpath).get_attribute("src")

        full_name = 'images\\' + image_name + ' (' + str(counter) + ').webp'
        urllib.request.urlretrieve(full_image_url, full_name)
        counter += 1

        ActionChains(driver).move_to_element(close_button).perform() # Close butto n
        close_button.click()
        sleep(2)


def get_close_button(driver:WebDriver):
    global close_button_div
    print(f'close_button_div: {close_button_div}')
    try:    
        return driver.find_element(By.XPATH, f"/html/body/div[{close_button_div}]/section/div[2]/button[2]")
    except: 
        close_button_div += 1
        try:
            print(f'close_button_div: {close_button_div}')
            return driver.find_element(By.XPATH, f"/html/body/div[{close_button_div}]/section/div[2]/button[2]")
        except:
            input("Revisar que mierda")


global close_button_div
if __name__ == '__main__':
    main()



