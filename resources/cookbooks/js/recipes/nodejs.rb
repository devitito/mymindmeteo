#
# Cookbook Name:: nodejs
# Recipe:: default
#
# Copyright (C) 2014 devitito
#
# All rights reserved - Do Not Redistribute
#

execute "Compile and install python" do
  command "apt-get install python-software-properties python g++ make --yes"
  action :run
end

execute "add-apt-repository" do
  command "apt-get install software-properties-common --yes"
  action :run	
end

execute "Add the PPA Repository, which is recommended by Joyent (the maintainers of Node.js)" do
  command "add-apt-repository ppa:chris-lea/node.js -y"
  action :run
end

execute "Update the package list" do
  command "apt-get update"
  action :run
end

execute "Install nodejs" do
  command "apt-get install nodejs --yes --fix-missing"
  action :run
end

#execute "Install npm" do
#  command "apt-get install npm --yes --fix-missing"
#  action :run
#end

#execute "fix" do 
#  command "ln -s /usr/bin/nodejs /usr/bin/node"
#  action :run
#end