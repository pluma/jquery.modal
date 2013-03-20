min:
	@./node_modules/.bin/uglifyjs lib/jquery.modal.js > lib/jquery.modal.min.js

lint:
	@./node_modules/.bin/jshint lib/jquery.modal.js

.PHONY: lint
