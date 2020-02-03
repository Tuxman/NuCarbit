# PYTHON := pipenv run python
# bot_version := $(shell pipenv run python python/setup.py --version)
ui_version := $(shell node -p "require(\"./ui/package.json\").version")
dar := target/*.dar
# bot := target/dablchat-bot-$(bot_version).tar.gz
ui := target/dablchat-ui-$(ui_version).zip

# package: $(bot) $(dar) $(ui)
.PHONY: package
package: $(dar) $(ui)
	# cd target && zip o-beer.zip * && rm o-beer*


$(dar):
	daml build
	mkdir -p $(@D)
	mv .daml/dist/*.dar $(@D)


# $(bot):
# 	cd python && $(PYTHON) setup.py sdist
# 	rm -fr python/dablchat_bot.egg-info
# 	mkdir -p $(@D)
# 	mv python/dist/dablchat-bot-$(bot_version).tar.gz $@
# 	rm -r python/dist


$(ui):
	yarn --cwd ui/ install
	yarn --cwd ui/ build
	#this is gross
	cd ui; zip -r o-beer-ui-$(ui_version).zip dist/
	cd ui; mkdir -p ../$(@D)
	cd ui; mv o-beer-ui-$(ui_version).zip ../$@
	cd ui; rm -r dist

.PHONY: clean
clean:
	# rm -fr python/dablchat_bot.egg-info python/dist target/*
	rm -rf target/*
