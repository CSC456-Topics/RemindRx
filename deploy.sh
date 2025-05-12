#!/bin/bash

# $1 is the version number passed as an argument
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
ZIP_FILE="myapp_deploy-$1-$TIMESTAMP.zip"

# Create a zip with the required folders and files
zip -r "$ZIP_FILE" \
  ./server \
  ./scanner \
  ./recommend \
  ./requirements.txt \
  ./.ebextensions \
  ./Procfile

# Upload the artifact to S3
aws s3 cp "$ZIP_FILE" s3://elasticbeanstalk-us-east-1-433574703961

# Create a new application version in Elastic Beanstalk
aws elasticbeanstalk create-application-version \
  --application-name RemindRX \
  --source-bundle S3Bucket="elasticbeanstalk-us-east-1-433574703961",S3Key="$ZIP_FILE" \
  --version-label "ver-$1-$TIMESTAMP" \
  --description "New deploy version" \
  --region "us-east-1"

# Update the Elastic Beanstalk environment
aws elasticbeanstalk update-environment \
  --environment-name RemindRX-env \
  --version-label "ver-$1-$TIMESTAMP" \
  --region "us-east-1"
