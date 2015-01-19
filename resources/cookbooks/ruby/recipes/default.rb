#
# Cookbook Name:: ruby
# Recipe:: default
#
# Copyright (C) 2014 YOUR_NAME
#
# All rights reserved - Do Not Redistribute
#

execute "download ruby-install" do
  command "wget -O ruby-install-0.5.0.tar.gz https://github.com/postmodern/ruby-install/archive/v0.5.0.tar.gz"
	action :run
end

execute "unpack ruby-install" do
	command "tar -xzvf ruby-install-0.5.0.tar.gz"
	action :run
end

execute "install ruby-install" do
	command "cd ruby-install-0.5.0/"
	command "make install"
	action :run
end

execute "install ruby 2.0 into /usr/local" do
  command "ruby-install --system ruby 2.0.0-p481"
	action :run
end

execute "install gem" do
  command "apt-get install zlib1g-dev libopenssl-ruby1.9.1 libssl-dev libyaml-0-2 libxslt-dev libxml2-dev libreadline-gplv2-dev libncurses5-dev file git --yes --fix-missing"
  action :run
end
