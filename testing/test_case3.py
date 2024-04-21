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

employee_feedback_link = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, '//a[contains(@href, "/employee-feedback")]'))
)
employee_feedback_link.click()

# Find and click on the "Give Feedback" button
give_feedback_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, '//button[contains(text(), "Give Feedback")]'))
)
give_feedback_button.click()

feedback_textarea = WebDriverWait(driver, 10).until(
    EC.visibility_of_element_located((By.CSS_SELECTOR, 'textarea.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputMultiline.css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input'))
)

# Clear any existing text in the textarea
feedback_textarea.clear()

# Enter the feedback using send_keys
feedback_textarea.send_keys("This is my feedback")


# Locate and click the first button
button_4 = driver.find_element(By.XPATH, '//button[text()="4"]')
button_4.click()

# Locate and click the second button
submit_button = driver.find_element(By.XPATH, '//button[contains(text(), "Submit")]')
submit_button.click()

# Add a delay to keep the browser open for a few seconds
time.sleep(5)  # Adjust the delay time as needed (e.g., 5 seconds)

# Close the browser
driver.quit()  # Use driver.quit() to close the browser session properly
