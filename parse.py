#!/usr/bin/python

from dateutil.parser import *
import json
import re

place = "Washington, DC"

catalog = open("jsoncatalog.txt","w")
inputtxt = open("input.txt","w")



def printOut(filename):
    n = 0
    place = "Washington, DC"

    for line in open(filename,"r"):
        n+=1 
        dat = dict()
        try:
            id = str(n)
            dat['filename'] = id + filename
            dat['searchstring'] = re.sub(r"[\t\n]"," ",line)
            stuff = line.split("\t")

            for entry in ["time","event","place","press","date"]:
                dat[entry] = stuff.pop(0)
            inputtxt.write(dat['filename'] + "\t" + dat["event"] + " " + dat["place"] + "\n")
            if filename == "data.txt":
                dat["who"] = "Obama"
            else:
                dat["who"] = "Biden"

            ent = dat["event"]
            time = parse(dat['date'])
            dat["date"] = "-".join([str(time.year),str(time.month),str(time.day)])

            m0 = re.search(r'arrives? (at |in )?(.*)',ent)
            if m0:
                place = m0.groups()[1]

            dat["city"] = place

            m1 = re.search(r'departs (.*)',ent)
            if m1:
                place = ""
            m2 = re.search(r'en route (.*)',ent)
            if m2:
                place = m2.groups()[0]
                
            catalog.write(json.dumps(dat) + "\n")

            output = ""
            
            for entry in ["time","event","place","press","date","city","who"]:
                output = output + dat[entry] + "\t"
            output.rstrip("\t")
            print output
        except:
            raise
            pass

for filename in ["data.txt","veep.txt"]:
    printOut(filename)
