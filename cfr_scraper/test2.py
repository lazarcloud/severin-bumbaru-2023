from datetime import time, datetime, timedelta
import time as tm
midnight = datetime.combine(datetime.today(), time.min).timestamp
date = datetime.combine(datetime.today(), time.min) + timedelta(3)
print(date.timestamp())
print(tm.time())