#
# Cookbook Name:: sails
# Recipe:: default
#
# Copyright (C) 2014 devitito
#
# All rights reserved - Do Not Redistribute
#

include_recipe 'js::default'

execute "Install sails and Forever" do
  command "npm -g install sails forever --yes"
  action :run
end

execute "Install node theseus debugger" do
  command "npm -g install node-theseus --yes"
  action :run
end

execute "Install mocha and istanbul code coverage tool" do
  command "npm -g install mocha istanbul --yes"
  action :run
end
