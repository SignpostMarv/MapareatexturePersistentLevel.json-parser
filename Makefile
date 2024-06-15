install:
	@NODE_OPTIONS='' npm install

build:
	@echo 'building from ./tsconfig.app.json'
	@NODE_OPTIONS='' ./node_modules/.bin/tsc --project ./tsconfig.app.json

lint--tsc:
	@echo 'running syntax check'
	@NODE_OPTIONS='' ./node_modules/.bin/tsc --project ./tsconfig.app-check.json

lint--prettier:
	@echo 'running prettier'
	@./node_modules/.bin/prettier . --check

lint--eslint:
	@echo 'checking eslint for all issues'
	@./node_modules/.bin/eslint  \
		--cache-location ./.eslintcache \
		--cache-strategy content \
		--cache \
		'./*.ts' lib

lint: lint--prettier lint--tsc lint--eslint

png: build
	@echo 'creating png'
	@./node_modules/.bin/ts-node ./png.ts

npm-prep: tests
	@echo 'building from ./tsconfig.app-npm.json'
	@NODE_OPTIONS='' ./node_modules/.bin/tsc --project ./tsconfig.app-npm.json
	@npm publish --dry-run
