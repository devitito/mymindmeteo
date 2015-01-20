#
# Cookbook Name:: ruby
# Recipe:: default
#
# Copyright (C) 2014 YOUR_NAME
#
# All rights reserved - Do Not Redistribute
#

execute "install ruby 1.9.1" do
  command "apt-get install zlib1g-dev libopenssl-ruby1.9.1 libssl-dev libyaml-0-2 libxslt-dev libxml2-dev libreadline-gplv2-dev libncurses5-dev file ruby1.9.1-dev git --yes --fix-missing"
  action :run
end
