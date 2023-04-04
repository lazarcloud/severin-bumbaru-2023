from datetime import time, datetime
midnight = datetime.combine(datetime.today(), time.min).timestamp
print(midnight)