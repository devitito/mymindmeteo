remote_file "#{Chef::Config[:file_cache_path]}/codedeploy-agent_all.deb" do
    source "https://s3.amazonaws.com/aws-codedeploy-us-east-1/latest/codedeploy-agent_all.deb"
end

package "codedeploy-agent" do
	action :install
	source "#{Chef::Config[:file_cache_path]}/codedeploy-agent_all.deb"
end

execute "Install marvel" do
  command "dpkg -i #{Chef::Config[:file_cache_path]}/codedeploy-agent_all.deb"
  action :run
end

service "codedeploy-agent" do
	action [:enable, :start]
end
