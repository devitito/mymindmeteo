execute "download codedeploy-agent" do
	command "cd ~"
	command "aws s3 cp s3://aws-codedeploy-us-east-1/latest/install . --region us-east-1"
  action :run
end

execute "Install codedeploy-agent" do
	command "chmod +x ./install"
	command "sed -i 's/sleep(.*)/sleep(10)/' install "
  command "sudo ./install auto"
  action :run
end
