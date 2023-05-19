PROJECT_NAME=gpt-telegram-bot
IMAGE_NAME=olegkireev/$(PROJECT_NAME)
CONTAINER_NAME=$(PROJECT_NAME)-container

dockerize:
	docker build -t $(IMAGE_NAME) .

start:
	docker run --name $(CONTAINER_NAME) -p 8000:8000 -d $(IMAGE_NAME)

stop:
	docker stop $(CONTAINER_NAME)

remove: stop
	docker rm $(CONTAINER_NAME)
	docker image rm $(IMAGE_NAME)

update: remove dockerize

push:
	docker push $(IMAGE_NAME):latest