#!/bin/bash
if [-e /home/ubuntu/mindmeteo/app.js]
then 
	forever stop /home/ubuntu/mindmeteo/app.js > /tmp/log/stopforever.out 2>&1
else
	echo '/home/ubuntu/mindmeteo/app.js not found. forever stop not called' > /tmp/log/stopforever.out 2>&1
fi
