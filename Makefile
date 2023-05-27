run:
	docker run -d -p 3030:80 -v "D:/programs/OpenServer/domains/gubernator-tablet:/app" --name front_guber_container marshal327/front_guber
run-linux:
	sudo docker run -d -p 3030:80 -v "/home/asshvedenko/front:/app" --name front_guber_container marshal327/front_guber
start:
	docker start front_guber_container
stop:
	docker stop front_guber_container