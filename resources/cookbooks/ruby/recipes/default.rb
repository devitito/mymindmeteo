#
# Cookbook Name:: ruby
# Recipe:: default
#
# Copyright (C) 2014 YOUR_NAME
#
# All rights reserved - Do Not Redistribute
#


#
# Cookbook Name:: ruby
# Recipe:: default
#
# Copyright (C) 2014 YOUR_NAME
#
# All rights reserved - Do Not Redistribute
#

include_recipe 'ruby_install::default'

execute "install ruby 2.0" do
	command "ruby-install --rubies-dir /opt/rubies/ ruby 2.0.0-p576"
  #command "ruby-install -M https://ftp.ruby-lang.org/pub/ruby ruby 2.0.0-p576"
	command "ln -s /opt/rubies/ruby-2.0.0-p576/bin/ruby /usr/bin/ruby2.0"
	action :run
end

execute "apt-get install -f" do
  command "apt-get -f install"
	action :run
end

execute "install gem" do
  command "apt-get install zlib1g-dev libopenssl-ruby1.9.1 libssl-dev libyaml-0-2 libxslt-dev libxml2-dev libreadline-gplv2-dev libncurses5-dev file git --yes --fix-missing"
  action :run
end

#execute "install ruby 1.9.1" do
#  command "apt-get install zlib1g-dev libopenssl-ruby1.9.1 libssl-dev libyaml-0-2 libxslt-dev libxml2-dev libreadline-gplv2-dev libncurses5-dev file ruby1.9.1-dev git --yes --fix-missing"
#  action :run
#end
