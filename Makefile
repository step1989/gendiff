install:
	npm install
start:
	dist/bin/gendiff.js
publish:
	npm publish --dry-run
build:
	rm -rf dist
	npm run build
lint:
	npx eslint .