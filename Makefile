init:
	@./bin/fresh_install.sh

reset:
	@./bin/reset_db.sh

deploy:
	@./bin/deploy.sh

test:
	docker-compose exec django py.test
