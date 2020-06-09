#!/bin/bash 
echo "//registry.npmjs.org/:_authToken=$1" > .npmrc
echo "@fortawesome:registry=https://npm.fontawesome.com/" >> .npmrc
echo "//npm.fontawesome.com/:_authToken=$2" >> .npmrc

