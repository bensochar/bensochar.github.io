---
layout: post
title:  "USGS GeoJSON API"
date:   2015-08-01 00:52:21 -0500
categories: api json
---
I went through a lot of APIS when building [DOOMcast](http://doomcast.herokuapp.com). The one that really stands out is the [USGS GeoJSON](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) API. The feed is updated in real-time. Formatted well. Its excellent.

USGS follows the [GeoJSON](http://geojson.org/geojson-spec.html) spec for geographic features. So if you've worked with this spec int he past it should be a qauick read.

USGS doucments the params you can pass here:
[http://earthquake.usgs.gov/fdsnws/event/1/](http://earthquake.usgs.gov/fdsnws/event/1/)

Earthquakes for the last 24 hours:
[http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson](http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson)

You can get more detail on an event by passing an id:
[http://earthquake.usgs.gov/fdsnws/event/1/query?eventid=hv60995496&format=geojson](http://earthquake.usgs.gov/fdsnws/event/1/query?eventid=hv60995496&format=geojson)

From there you can get a list of cities close to the event:
[http://earthquake.usgs.gov/archive/product/nearby-cities/hv60995496/us/1438426393480/nearby-cities.json](http://earthquake.usgs.gov/archive/product/nearby-cities/hv60995496/us/1438426393480/nearby-cities.json)

Its a fun API. The best I've worked with in a while. Would really like to see USGS pass it on to [GeoMAC](http://wildfire.usgs.gov/geomac/) Wildfire feed.