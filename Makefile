IMAGE_NAME=olegkireev/gpt-telegram-bot
CONTAINER_NAME=$(IMAGE_NAME)-container

dockerize:
	docker build -t $(IMAGE_NAME) .

start:
	docker run --name $(CONTAINER_NAME) -p 8000:8000 $(IMAGE_NAME)

stop:
	docker stop $(CONTAINER_NAME)

remove: stop
	docker rm $(CONTAINER_NAME)
	docker image rm $(IMAGE_NAME)

update: remove dockerize

push:
	docker push $(IMAGE_NAME):latest