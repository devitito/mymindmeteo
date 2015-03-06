#
# Cookbook Name:: mymeteodb
# Recipe:: mysql
#
# Copyright (C) 2014 devitito
#
#

include_recipe 'mysql::server'
include_recipe 'database::mysql'

# Create a mysql database
mysql_database node['mymeteodb']['database']['dbname_test'] do
  connection(
    :host => node['mymeteodb']['database']['host'],
    :username => node['mymeteodb']['database']['username'],
    :password => node['mymeteodb']['database']['password']
  )
  action :create
end

# grant a mysql user
mysql_database_user node['mymeteodb']['database']['app']['username'] do
  connection(
    :host => node['mymeteodb']['database']['host'],
    :username => node['mymeteodb']['database']['username'],
    :password => node['mymeteodb']['database']['password']
  )
  password node['mymeteodb']['database']['app']['password']
  database_name node['mymeteodb']['database']['dbname_test']
  host '%'
  action [:create, :grant]
end

# Write schema seed file to filesystem
cookbook_file node['mymeteodb']['database']['seed_test_file'] do
  source 'test-fixtures.sql'
  owner 'root'
  group 'root'
  mode '0600'
end

# Seed database with test data
execute 'initialize mymeteo_test database' do
  command "mysql -h #{node['mymeteodb']['database']['host']} -u #{node['mymeteodb']['database']['app']['username']} -p#{node['mymeteodb']['database']['app']['password']} -D #{node['mymeteodb']['database']['dbname_test']} < #{node['mymeteodb']['database']['seed_test_file']}"
  not_if  "mysql -h #{node['mymeteodb']['database']['host']} -u #{node['mymeteodb']['database']['app']['username']} -p#{node['mymeteodb']['database']['app']['password']} -D #{node['mymeteodb']['database']['dbname_test']} -e 'describe users;'"
end
