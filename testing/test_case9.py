from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Initialize the WebDriver (assuming Chrome)
driver = webdriver.Chrome()

# Open the webpage
driver.get("http://localhost:3000")

# Find the "Sign In" button by CSS selector
sign_in_button = driver.find_element(By.CSS_SELECTOR, 'button[class*="bg-primary"]')

time.sleep(2) 
# Click on the "Sign In" button
sign_in_button.click()

# Wait for the email input field to be visible
email_input = WebDriverWait(driver, 10).until(
    EC.visibility_of_element_located((By.ID, 'email'))
)

# Enter the email address
email_input.send_keys("25100226@devsinc.io")

# Wait for the password input field to be visible
password_input = WebDriverWait(driver, 10).until(
    EC.visibility_of_element_located((By.ID, 'password'))
)

# Enter the password
password_input.send_keys("Adil123!")
time.sleep(2) 
sign_in_button_after_login = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, 'button[class*="bg-secondary"]'))
)
time.sleep(2) 
# Click on the "Sign In" button after login
sign_in_button_after_login.click()

dashboard_link = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, '//a[@href="/dashboard"]'))
)

# Click on the anchor tag to go to the dashboard
dashboard_link.click()

profile = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, '//a[contains(@href, "/profile")]'))
)

profile.click()

# Wait for the "Edit Profile" button to be clickable
edit_profile_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, '//button[contains(text(), "Edit Profile")]'))
)

# Click on the "Edit Profile" button
edit_profile_button.click()

# Wait for the phone number input field to be visible
city_input = WebDriverWait(driver, 10).until(
    EC.visibility_of_element_located((By.ID, 'city'))
)

# Clear the existing phone number and enter a new one
city_input.clear()
city_input.send_keys("Lahore")

# Wait for the phone number input field to be visible
phone_input = WebDriverWait(driver, 10).until(
    EC.visibility_of_element_located((By.ID, 'phone'))
)

# Clear the existing phone number and enter a new one
phone_input.clear()
phone_input.send_keys("apple")

# Wait for the "Save Changes" button to be clickable
save_changes_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, '//button[contains(text(), "Save Changes")]'))
)

# Click on the "Save Changes" button
save_changes_button.click()

# Add a delay to keep the browser open for a few seconds
time.sleep(5) 

# Close the browser
driver.quit()  # Use driver.quit() to close the browser session properly
