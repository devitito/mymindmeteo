execute "download codedeploy-agent" do
	command "aws s3 cp s3://aws-codedeploy-us-east-1/latest/install /home/ubuntu/ --region us-east-1"
  action :run
end

execute "Install codedeploy-agent" do
	command "chmod +x /home/ubuntu/install"
	command "sed -i 's/sleep(.*)/sleep(10)/' install"
  command "apt-get -f install"
  command "/home/ubuntu/install auto"
  action :run
end
