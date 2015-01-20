execute "download codedeploy-agent" do
	command "aws s3 cp s3://aws-codedeploy-us-east-1/latest/codedeploy-agent_all.deb #{Chef::Config[:file_cache_path]} --region us-east-1"
  action :run
end

#execute "chmod codedeploy-agent install file" do
#	command "chmod +x #{Chef::Config[:file_cache_path]}/install"
#  action :run
#end

#execute "hack to get the agent running faster" do
#	command "sed -i 's/sleep(.*)/sleep(10)/' #{Chef::Config[:file_cache_path]}/install"
#  action :run
#end

execute "apt-get -f install" do
  command "apt-get -f install"
  action :run
end

#execute "Install codedeploy-agent" do
#  command "#{Chef::Config[:file_cache_path]}/install auto"
#  action :run
#end

execute "Install codedeploy-agent" do
  command "dpkg -i #{Chef::Config[:file_cache_path]}/codedeploy-agent_all.deb"
  action :run
end

#sudo apt-get install ruby2.0
#cd /home/ubuntu
#sudo aws s3 cp s3://aws-codedeploy-us-east-1/latest/install . --region us-east-1
#sudo chmod +x ./install
#sudo ./install auto
