#
# Cookbook Name:: ruby
# Recipe:: default
#
# Copyright (C) 2014 YOUR_NAME
#
# All rights reserved - Do Not Redistribute
#

include_recipe 'ruby_install::default'

execute "install gem" do
  command "apt-get install zlib1g-dev libopenssl-ruby1.9.1 libssl-dev libyaml-0-2 libxslt-dev libxml2-dev libreadline-gplv2-dev libncurses5-dev file git ruby2.0 --yes --fix-missing"
  action :run
end

#execute "install ruby 2.0" do
#	command "ruby-install --rubies-dir /opt/rubies/ ruby 2.0.0-p576"
#	action :run
#end

#execute "create link to ruby 2.0" do
#	command "ln -s /opt/rubies/ruby-2.0.0-p576/bin/ruby /usr/bin/ruby2.0"
#	action :run
#end

#execute "remove link to ruby" do
#	command "rm /usr/bin/ruby"
#	action :run
#end

#execute "create link to ruby" do
#	command "ln -s /usr/bin/ruby2.0 /usr/bin/ruby"
#	action :run
#end

#execute "apt-get install -f" do
#  command "apt-get -f install"
#	action :run
#end
