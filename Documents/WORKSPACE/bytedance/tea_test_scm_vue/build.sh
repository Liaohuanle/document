#!/bin/bash

PRO_ENV=online
DIR=`pwd`
OUTPUT="$DIR/output"
RESOURCE="$DIR/output_resource"

rm -rf $OUTPUT
rm -rf $RESOURCE

if [ -f '/etc/profile' ]
then
    source /etc/profile
fi

if [ -d './node_modules' ]
then
    echo "node_modules exist"
else
    mkdir node_modules
fi

rm -rf node_modules/*

nvm use 8.2.1 && node -v
npm install --registry http://npm.byted.org/ --verbose

mya -v --no-color
mya release --no-color -d output

mv output/resource output_resource