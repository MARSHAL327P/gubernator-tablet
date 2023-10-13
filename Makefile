build:
	docker build . -t marshal327/front_guber
run:
	docker run -d -p 3030:443 --name front_guber_container marshal327/front_guber
run-linux:
	sudo docker run -d -p 3000:443 --name front_guber_container marshal327/front_guber
update-container:
	sudo docker login
	sudo docker pull marshal327/front_guber:latest
	sudo docker stop front_guber_container
	sudo docker rm front_guber_container
	sudo docker run -d -p 443:443 --restart=always --name=front_guber_container marshal327/front_guber:latest
start:
	docker start front_guber_container
stop:
	docker stop front_guber_container
cmd:
	docker exec -it front_guber_container bash
delete-all:
	make stop
	docker container prune
	docker rmi marshal327/front_guber
