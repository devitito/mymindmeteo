#!/bin/bash
forever start /home/ubuntu/mindmeteo/app.js --prod > /tmp/log/restartforever.out 2>&1
service elasticsearch start
