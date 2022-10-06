#!/bin/bash

# Check if argument given
if [ $# -gt 0 ]; then
  # Check if argument is "development"
  if [ $1 == 'development' ]; then
    # Check if .env exists
    if [ -f $PWD/backend/.env ]; then
      # Add development mode
      sed -i '' -e 's/production/development/g' $PWD/backend/.env
    else
      # Copy .env.example and add development mode
      cp $PWD/backend/.env.example $PWD/backend/.env
      sed -i '' -e 's/production/development/g' $PWD/backend/.env
    fi
    # make www/frontend folder
    mkdir -p $PWD/www/frontend
    # symlink assets
    ln -sfn $PWD/frontend/assets $PWD/www/frontend/assets
  else
    # check if .env exists
    if [ -f $PWD/backend/.env ]; then
      # Add production mode
      sed -i '' -e 's/development/production/g' $PWD/backend/.env
    else
      # Copy .env.example and add production mode
      cp $PWD/backend/.env.example $PWD/backend/.env
      sed -i '' -e 's/development/production/g' $PWD/backend/.env
    fi
    # remove symlinked assets
    rm -rf $PWD/backend/frontend
  fi
fi