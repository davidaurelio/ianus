#!/bin/bash

SAUCE_CONCURRENCY=${1:-0}

if [ $SAUCE_CONCURRENCY -gt 0 ]; then
  NUM_BROWSERS=`node karma.conf-ci.js`
  I=0
  while [ $I -lt $NUM_BROWSERS ]; do
    SAUCE_RANGE="$I,$SAUCE_CONCURRENCY" npm run test-sauce
    let I+=SAUCE_CONCURRENCY
  done;
else
  npm run test-sauce
fi
