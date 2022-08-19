#!/bin/bash

echo "########### Loading data to Mongo DB ###########"
mongoimport --jsonArray --db crm --collection users --file /tmp/data/data.json