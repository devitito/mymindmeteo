#
# Cookbook Name:: bower
# Recipe:: default
#
# Copyright (C) 2014 devitito
#
# All rights reserved - Do Not Redistribute
#

include_recipe 'js::default'
include_recipe 'js::nodejs'

execute "Install bower" do
  command "npm install -g bower"
  action :run
end
