init:
	@./bin/fresh_install.sh

reset:
	@./bin/reset_db.sh

deploy:
	@./bin/deploy.sh

update_from_skeletor:
	@./bin/update_from_skeletor.sh

test:
	docker-compose exec django py.test
	docker-compose exec builder yarn test
