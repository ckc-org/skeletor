init:
	@./bin/fresh_install.sh
	@./bin/create_git_hooks.sh

reset:
	@./bin/reset_db.sh

deploy:
	@./bin/deploy.sh

test:
	docker-compose exec django py.test
	docker-compose exec builder yarn test
