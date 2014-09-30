#
# Cookbook Name:: zendphp
# Recipe:: default
#
# Copyright (C) 2014 YOUR_NAME
#
# All rights reserved - Do Not Redistribute
#

include_recipe "zendphp::repository"

package "zend-server-php-5.5"
  conf_plain_file '/etc/profile' do
  pattern /\/usr\/local\/zend\/bin/
  new_line 'PATH=$PATH:/usr/local/zend/bin'
  action :insert_if_no_match
end

conf_plain_file '/etc/profile' do
  pattern /\/usr\/local\/zend\/lib/
  new_line 'LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/zend/lib'
  action :insert_if_no_match
end

link "/usr/bin/php" do
  to "/usr/local/zend/bin/php"
  action :create
end

conf_plain_file '/usr/local/zend/etc/php.ini' do
  pattern   /;date.timezone/
  new_line  "date.timezone = #{node['zendphp']['timezone']}"
  action :insert_after_match
end

service "apache2" do
  action :restart
end