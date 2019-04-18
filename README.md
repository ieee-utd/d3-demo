# D3 Demo

## Set Up

1. Fire up MongoDB.

2. Import the `websites.csv` file to MongoDB with `mongoimport -d d3-demo -c websites --type csv --file websites.csv --headerline`. You should see the following output:

```
2019-04-18T11:31:49.868-0500    connected to: localhost
2019-04-18T11:31:50.214-0500    imported 9540 documents
```

## UI

1. Ensure the Polymer CLI is installed: `npm install -g polymer-cli`.