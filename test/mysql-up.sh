#!/usr/bin/env bash

docker kill local-mysql || echo "local-mysql is already killed"
docker rm local-mysql || echo "local-mysql not exist"
docker run --name local-mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=1 -d -p 3306:3306 mysql:5.7