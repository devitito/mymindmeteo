# Write http redirection file
cookbook_file '/etc/nginx/conf.d/http-redirect.conf' do
  source 'http-redirect.conf'
  owner 'www-data'
  group 'www-data'
  mode '0755'
  action :create
end

execute "restart nginx" do
	command "service nginx restart"
  action :run
end
