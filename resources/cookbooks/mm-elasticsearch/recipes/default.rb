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
execute "Install marvel" do
  command "cd /usr/local/bin"
	command "plugin -i elasticsearch/marvel/latest"
	command "service elasticsearch restart"
  action :run
end


execute "remove ngninx default site" do
  command "rm /etc/nginx/sites-enabled/default"
  action :run
end

execute "restart nginx" do
	command "service nginx restart"
  action :run
end

#cd /usr/local/bin
#plugin -i elasticsearch/marvel/latest
# service elasticsearch restart
