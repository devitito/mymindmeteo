#
# Cookbook Name:: sails
# Recipe:: default
#
# Copyright (C) 2014 devitito
#
# All rights reserved - Do Not Redistribute
#

include_recipe 'js::nodejs'

execute "Install Forever" do
  command "npm -g install sails forever --yes"
  action :run
end
