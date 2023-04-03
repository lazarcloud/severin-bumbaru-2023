FROM python:3.6

COPY ./python_api /app/python_api
COPY .?cfr_scraper /app/cfr_scraper
WORKDIR /app/python_api
RUN pip install -r /app/requirements.txt
ENTRYPOINT ["python"]
CMD ["app.py"]
