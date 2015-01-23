#!/bin/bash
/usr/bin/forever list > /var/log/stopforever.out 2>&1
if [ -e /home/ubuntu/mindmeteo/app.js ]
then 
	/usr/bin/forever stop /home/ubuntu/mindmeteo/app.js >> /var/log/stopforever.out 2>&1
else
	echo '/home/ubuntu/mindmeteo/app.js not found. forever stop not called' >> /var/log/stopforever.out 2>&1
fi
