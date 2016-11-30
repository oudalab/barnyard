#!/usr/bin/python
import sys
import logging
from logging.handlers import RotatingFileHandler
from logging.handlers import SysLogHandler

logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/barnyard/")

from FlaskApp import app as application
application.secret_key = 'wearedifferent'
#handler = RotatingFileHandler('/var/log/barnyard.log', maxBytes=10000, backupCount=1)
handler = SysLogHandler()
handler.setLevel(logging.INFO)
application.logger.addHandler(handler)
