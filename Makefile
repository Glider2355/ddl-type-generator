DIST = dist/workflow/generateTypeFile.js

.PHONY: generate clean

generate:
	npm run build
	node ${DIST} Users

clean:
	rm -rf dist && rm -rf gen
