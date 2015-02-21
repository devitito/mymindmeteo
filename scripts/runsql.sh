if [ "$(ls -A sql)" ]
then
	cat sql/*.sql | mysql -uroot -pbomber mymeteo
fi
