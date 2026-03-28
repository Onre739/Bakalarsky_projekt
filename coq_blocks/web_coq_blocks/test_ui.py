from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

class FrontendUITests(StaticLiveServerTestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        # Moderní Selenium si ovladač pro Chrome stáhne samo
        cls.selenium = webdriver.Chrome()
        cls.selenium.implicitly_wait(5) # Počká až 5s na načtení prvků

    @classmethod
    def tearDownClass(cls):
        cls.selenium.quit() # Zavře prohlížeč po testech
        super().tearDownClass()

    def test_add_definition_creates_block(self):
        # 1. Arrange: Otevři hlavní stránku aplikace
        self.selenium.get(self.live_server_url)

        # 2. Open modal
        import_modal_button = self.selenium.find_element(By.ID, "showImportedModalBtn")
        import_modal_button.click()

        # 3. Find textarea and input Coq code
        text_area = WebDriverWait(self.selenium, 5).until(
            EC.element_to_be_clickable((By.ID, "defInput"))
        )
        text_area.send_keys("Inductive nat : Type := | O | S : nat -> nat.")
        
        # 4. Find and click submit button
        submit_button = WebDriverWait(self.selenium, 5).until(
            EC.element_to_be_clickable((By.ID, "loadBtn"))
        )
        submit_button.click()

        # 5. Open accordion for imported types
        imported_types_accordion = WebDriverWait(self.selenium, 5).until(
            EC.element_to_be_clickable((By.ID, "importedTypesAccordionButton"))
        )
        imported_types_accordion.click() 

        # 6. Open accordion for nat type
        type_accordion = WebDriverWait(self.selenium, 5).until(
            EC.element_to_be_clickable((By.ID, "accordion-button-nat"))
        )
        type_accordion.click()

        # 7. Find and click spawn button for O constructor
        spawn_button = WebDriverWait(self.selenium, 5).until(
            EC.element_to_be_clickable((By.ID, "spawn-nat-O-btn"))
        )
        spawn_button.click()

        # 8. Wait for blocks to appear
        time.sleep(1)

        # 9. Check new block on screen
        blocks = self.selenium.find_elements(By.CLASS_NAME, "constructor-block-O")
        self.assertTrue(len(blocks) > 0, "Na obrazovce se neobjevil žádný blok!")