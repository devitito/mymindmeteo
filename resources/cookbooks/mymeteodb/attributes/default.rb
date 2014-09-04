default['mysql']['server_root_password'] = 'bomber'
default['mysql']['allow_remote_root'] = true

default['mymeteodb']['database']['host'] = 'localhost'
default['mymeteodb']['database']['username'] = 'root'
default['mymeteodb']['database']['password'] = node['mysql']['server_root_password']
default['mymeteodb']['database']['dbname'] = 'mymeteo'

default['mymeteodb']['server']['name'] = 'mymeteodbsrv'
default['mymeteodb']['server']['port'] = 3306
default['mymeteodb']['server']['username'] = 'meteo'
default['mymeteodb']['server']['password'] = 'meteo'

default['mymeteodb']['database']['app']['username'] = 'mymeteo_app'
default['mymeteodb']['database']['app']['password'] = 'supersecret'

default['mymeteodb']['database']['seed_file'] = '/tmp/mymeteo-create.sql'