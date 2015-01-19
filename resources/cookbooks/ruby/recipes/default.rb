#
# Cookbook Name:: ruby
# Recipe:: default
#
# Copyright (C) 2014 YOUR_NAME
#
# All rights reserved - Do Not Redistribute
#

include_recipe 'ruby_install::default'

execute "install ruby 2.0 into /usr/local" do
  command "ruby-install --system ruby 2.0.0-p481"
	action :run
end

execute "install gem" do
  command "apt-get install zlib1g-dev libopenssl-ruby1.9.1 libssl-dev libyaml-0-2 libxslt-dev libxml2-dev libreadline-gplv2-dev libncurses5-dev file git --yes --fix-missing"
  action :run
end
