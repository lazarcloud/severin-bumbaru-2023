import threading
import time
from selenium import common

def timeout_handler():
    raise common.exceptions.TimeoutException

# Set a timeout of 10 seconds
timer = threading.Timer(10.0, timeout_handler)
timer.start()

try:
    # Code that may take too long to execute
    time.sleep(20) # Example code that takes too long
except common.exceptions.TimeoutException:
    # Handle timeout
    print("Timeout occurred")
except:
    # Handle other exceptions
    print("Other exception occurred")

# Cancel the timer
timer.cancel()
