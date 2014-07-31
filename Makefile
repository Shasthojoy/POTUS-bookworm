

input.txt:
	python parse.py > /dev/null

jsoncatalog.txt:
	python parse.py > /dev/null

POTUS:
	git clone git@github.com:bmschmidt/Presidio $@
	mkdir -p POTUS/files/texts
	mkdir -p POTUS/files/metadata
	cp input.txt POTUS/files/texts/input.txt
	cp jsoncatalog.txt POTUS/files/metadata/jsoncatalog.txt
	cp field_descriptions.json POTUS/files/metadata/field_descriptions.json

bookwormdatabase: POTUS
	cd POTUS; make


clean: 
	rm -rf bookworm
