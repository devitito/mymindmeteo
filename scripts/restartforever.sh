#!/bin/bash
forever start /home/ubuntu/mindmeteo/app.js --prod > /var/log/restartforever.out 2>&1
