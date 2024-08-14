#!/bin/sh

trap "nginx -s stop" SIGTERM

nginx -g "daemon off;"

while :; do
  sleep 1
done