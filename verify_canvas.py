from playwright.sync_api import sync_playwright

def verify_canvas():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:3000", wait_until="networkidle")
            page.wait_for_selector("canvas")
            page.screenshot(path="verification.png")
            print("Screenshot saved to verification.png")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_canvas()
