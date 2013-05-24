# -*- coding: utf-8 -*-

# load_json.py
# based on code from Matthew Russell's Mining the Social Web
# usage:
# $ python load_json.py <filename>

import sys
import os
import couchdb
try:
    import jsonlib2 as json
except ImportError:
    import json

# filename
JSON_MBOX = sys.argv[1]

server = couchdb.Server('http://localhost:5984')
db = server['apachemail']
docs = json.loads(open(JSON_MBOX).read())
db.update(docs, all_or_nothing=True)

