SHELL := /bin/bash

.PHONY: build

build: ## build a ready-production web application
	yarn run build

build-desktop: ## build a ready-production desktop application
	yarn electron-pack $(filter-out $@,$(MAKECMDGOALS))

deploy: ## deploy with zeit
	make build
	now --target production

install: ## install what we need
	mkdir -p ~/FHIR
	yarn

sandbox: ## sandbox for client-side application dev purpose
	yarn start

sandbox-desktop: ## sandbox for desktop application dev purpose
	ELECTRON_ENABLE_LOGGING=1 yarn electron-dev

test: ## test with watcher
	yarn test --coverage

test-ci: ## test in ci mode (without watcher)
	yarn test --coverage --watchAll=false

help: ## This help dialog.
	@IFS=$$'\n' ; \
	intro_lines=(`fgrep -h "###" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/###//'`); \
	for line in $${intro_lines[@]}; do \
		printf "%s\n" $$line; \
	done; \
	help_lines=(`fgrep -h -e "##" $(MAKEFILE_LIST) | fgrep -v "###" | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##/:/'`); \
	for help_line in $${help_lines[@]}; do \
		IFS=$$':' ; \
		help_split=($$help_line) ; \
		help_command=`echo $${help_split[0]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		help_info=`echo $${help_split[2]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		printf '\033[36m'; \
		printf "%-30s %s" $$help_command ; \
		printf '\033[0m'; \
		printf "%s\n" $$help_info; \
	done

.DEFAULT_GOAL := help
