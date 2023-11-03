FROM python:3.11-slim-bullseye

WORKDIR /app

ENV SENTRY_DSN=$SENTRY_DSN_API

RUN pip3 install flask gunicorn pylint 'sentry-sdk[flask]'

COPY . /app

CMD ["gunicorn"  , "-b", "0.0.0.0:8000", "-w", "4", "app:app"]