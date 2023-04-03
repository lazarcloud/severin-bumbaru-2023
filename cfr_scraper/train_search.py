import time
class Trip:
    def __init__(self,data):
        self.start_city=data["dep"]["city"]
        self.start_time=data["dep"]["time"]
        self.finish_city=data["arrival"]["city"]
        self.stops=[[city, days] for city, days in data["visits"].items()]
    