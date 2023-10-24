FROM python:3.11-bullseye

WORKDIR /app

RUN pip3 install flask gunicorn pylint

COPY . /app

CMD ["gunicorn"  , "-w", "4", "app:app"]