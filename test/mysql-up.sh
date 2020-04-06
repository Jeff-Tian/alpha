#!/usr/bin/env bash

container_name='local-mysql'

if [ "$(docker inspect -f '{{.State.Running}}' $container_name)" = "true" ]; then
  echo "$container_name is already running."
else
  docker kill $container_name || echo "$container_name is already killed"
  docker rm $container_name || echo "$container_name not exist"
  docker run --name $container_name -e MYSQL_ALLOW_EMPTY_PASSWORD=1 -d -p 3306:3306 mysql:5.7

  sleep 10
fi

# shellcheck disable=SC2016
docker exec -i $container_name mysql <<< 'CREATE DATABASE IF NOT EXISTS `alpha`;' || exit 1
# shellcheck disable=SC2016
echo 'database `alpha` is there'


