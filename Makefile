DIST = dist/main.js

.PHONY: generate clean

generate:
	npm run build
	@node $(DIST) $(filter-out $@,$(MAKECMDGOALS))

clean:
	rm -rf dist && rm -rf gen
%:
	@:
