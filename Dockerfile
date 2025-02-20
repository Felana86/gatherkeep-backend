FROM ubuntu:latest
LABEL authors="felan"

ENTRYPOINT ["top", "-b"]