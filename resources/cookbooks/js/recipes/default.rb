#
# Cookbook Name:: js
# Recipe:: default
#
# Copyright (C) 2014 devitito
#
# All rights reserved - Do Not Redistribute
#

include_recipe 'js::nodejs'

execute "Install grunt cli globally" do
  command "npm -g install grunt-cli --yes"
  action :run
end
