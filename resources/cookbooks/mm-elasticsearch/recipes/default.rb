#
# Cookbook Name:: mm-elasticsearch
# Recipe:: default
#
# Copyright (C) 2014 YOUR_NAME
#
# All rights reserved - Do Not Redistribute
#

include_recipe 'java'
include_recipe 'monit'
include_recipe 'elasticsearch::default'
include_recipe 'elasticsearch::nginx'
include_recipe 'elasticsearch::proxy'
include_recipe 'elasticsearch::monit'

#execuute : 
#cd /usr/local/bin
#plugin -i elasticsearch/marvel/latest
#restart service elasticsearch