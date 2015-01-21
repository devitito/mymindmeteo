#!/bin/bash
echo 'called' > /tmp/log/test.out 2>&1
rm -rf /home/ubuntu/mindmeteo  > /tmp/log/cleanBeforeInstall.out 2>&1

