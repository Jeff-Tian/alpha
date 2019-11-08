#!/usr/bin/env bash

container_name='local-redis'

if [ "$(docker inspect -f '{{.State.Running}}' $container_name)" = "true" ]; then
  echo "$container_name is already running."
else
  docker kill $container_name || echo "$container_name is already killed"
  docker rm $container_name || echo "$container_name not exist"
  docker run --name $container_name  -d -p 6379:6379 redis

  sleep 1
fi

echo 'Redis up'


