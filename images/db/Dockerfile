FROM mongo:4.0

RUN mongo &
COPY . /data/db/
RUN ls /data/db
RUN mongoimport --host 127.0.0.1 --port 27000  -d d3-demo -c websites --type csv --file /data/db/websites.csv --headerline