#
# Cookbook Name:: nodejs
# Recipe:: default
#
# Copyright (C) 2014 devitito
#
# All rights reserved - Do Not Redistribute
#

execute "Install nodejs" do
  command "apt-get install nodejs --yes --fix-missing"
  action :run
end

execute "Install npm" do
  command "apt-get install npm --yes --fix-missing"
  action :run
end