#
# Cookbook Name:: apache
# Recipe:: default
#
# Copyright (C) 2014 YOUR_NAME
#
# All rights reserved - Do Not Redistribute
#

template "/etc/apache2/sites-available/vagrant.conf" do
  source "apache234/vhost234.erb"
end

file "/etc/apache2/sites-enabled/000-default" do
  action :delete
end

link "/etc/apache2/sites-enabled/000-vagrant.conf" do
  to "/etc/apache2/sites-available/vagrant.conf"
  action :create
end

execute "Allowing apache to access vagrant files" do
  command "adduser www-data vagrant"
  action :run
end

conf_plain_file '/etc/apache2/ports.conf' do
  current_line   'Listen 80'
  new_line  'Listen 81'
  action :replace
end

service "apache2" do
  action :restart
end
