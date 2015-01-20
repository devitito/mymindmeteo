execute "download codedeploy-agent" do
	command "aws s3 cp s3://aws-codedeploy-us-east-1/latest/install #{Chef::Config[:file_cache_path]} --region us-east-1"
  action :run
end

execute "chmod codedeploy-agent install file" do
	command "chmod +x #{Chef::Config[:file_cache_path]}/install"
  action :run
end


execute "Install codedeploy-agent" do
	command "sed -i 's/sleep(.*)/sleep(10)/' #{Chef::Config[:file_cache_path]}/install"
  command "apt-get -f install"
  command "#{Chef::Config[:file_cache_path]}/install auto"
  action :run
end
