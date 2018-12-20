/* SIPCAPTURE Datasource */

var datasource_h5 = {
    "version": 1,
    "datasources": [
        {
            "name": "Method",
            "type": "JSON",
            "settings": {
                "path": "statistic\/method",
                "query": "{\n   \"timestamp\": {\n          \"from\": \"@from_ts\",\n          \"to\":  \"@to_ts\"\n   },\n  \"param\": {\n        \"filter\": [ \n             \"@filters\"\n       ],\n       \"limit\": \"@limit\",\n       \"total\": \"@total\"\n   }\n}",
                "method": "GET",
                "limit": 200,
                "total": false,
                "eval": {
                    incoming: {
                        name: "test incoming",
                        value: "var object = @incoming; return object"
                    }
                },
                "timefields" : [
                    { "field": "from_ts", "desc": "From Timestamp" },
                    { "field": "to_ts", "desc": "To Timestamp" }
                ],
                "fieldvalues": [
                    { "field": "total", "desc": "All Packets" }
                ],
                "filters": [
			{ "type": "method", "desc": "SIP Method", options: [ {"value": "!ALL"},{"value":"!TOTAL"},{"value": "TOTAL"},{"value": "INVITE"},{"value": "UPDATE"}, {"value": "REGISTER"}, {"value": "CANCEL"}, {"value": "BYE"}, {"value": "OPTIONS"}, {"value": "300"}, {"value": "401"}, {"value": "407"}, {"value": "200"} ] },
			{ "type": "cseq", "desc": "SIP Cseq", options: [ {"value": "INVITE"}, {"value": "UPDATE"},{"value": "REGISTER"},{"value": "CANCEL"}, {"value": "BYE"}, {"value": "OPTIONS"} ] },
			{ "type": "auth", "desc": "SIP Auth", options: [ {"value": "true"} ] },
			{ "type": "totag", "desc": "SIP To Tag", options: [ {"value": "true"} ] }
                ]
            }
        },
        {
            "name": "Data",
            "type": "JSON",
            "settings": {
                "path": "statistic\/data",
                        "query": "{\n   \"timestamp\": {\n          \"from\": \"@from_ts\",\n          \"to\":  \"@to_ts\"\n   },\n  \"param\": {\n        \"filter\": [ \n             \"@filters\"\n       ],\n       \"limit\": \"@limit\",\n       \"total\": \"@total\"\n   }\n}",
                "method": "GET",
                "limit": 200,
                "total": false,
                "eval": {
                    incoming: {
                        name: "test incoming",
                        value: "var object = @incoming; return object"
                    }
                },
                "timefields" : [
                    { "field": "from_ts", "desc": "From Timestamp" },
                    { "field": "to_ts", "desc": "To Timestamp" }
                ],
                "fieldvalues": [
                    { "field": "total", "desc": "All Packets" }
                ],
                "filters": [
		    { "type": "type", "desc": "Data Statistics", options: [
	                    { "value": "asr", "desc": "Answer Seizure Ratio" },
	                    { "value": "ner", "desc": "Network Effectiveness Ratio" },
	                    { "value": "packet_size", "desc": "Packet Size" },
	                    { "value": "packet_count", "desc": "Packet Count" },
	                    { "value": "sdf", "desc": "counter of call’s releases except busy and normal call clearing (17 && 16)" },
	                    { "value": "isa", "desc": "counter of replies on INVITE: 408|50[03]" },
	                    { "value": "sd", "desc": "counter of replies on INVITE: 50[034]" },
	                    { "value": "ssr", "desc": "call success setup rate" }
			]
		    }
                ]
            }
        },
        {
            "name": "Generic",
            "type": "JSON",
            "settings": {
                "path": "statistic\/generic",
                        "query": "{\n   \"timestamp\": {\n          \"from\": \"@from_ts\",\n          \"to\":  \"@to_ts\"\n   },\n  \"param\": {\n        \"filter\": [ \n             \"@filters\"\n       ],\n       \"limit\": \"@limit\",\n       \"total\": \"@total\"\n   }\n}",
                "method": "GET",
                "limit": 200,
                "total": false,
                "eval": {
                    incoming: {
                        name: "test incoming",
                        value: "var object = @incoming; return object"
                    }
                },
                "timefields" : [
                    { "field": "from_ts", "desc": "From Timestamp" },
                    { "field": "to_ts", "desc": "To Timestamp" }
                ],
                "fieldvalues": [
                    { "field": "total", "desc": "All Packets" }
                ],
                "filters": [
		    { "type": "type", "desc": "Data Statistics", options: [
	                    { "value": "interval", "desc": "interval" },
	                    { "value": "streams", "desc": "streams" },
	                    { "value": "packets", "desc": "packets" },
	                    { "value": "out-of-seq", "desc": "out-of-seq" },
	                    { "value": "late", "desc": "late" },
	                    { "value": "late_perc", "desc": "late * 100" },
	                    { "value": "lost", "desc": "lost" },
	                    { "value": "lost_perc", "desc": "lost * 100" },
	                    { "value": "delay_min", "desc": "delay min usec" },
	                    { "value": "delay_max", "desc": "delay max usec" },
	                    { "value": "jitter", "desc": "jitter avg usec" },
	                    { "value": "mos", "desc": "mos * 100" },
                            { "value": "cpu_user", "desc": "cpu_user" },
                            { "value": "cpu_system", "desc": "cpu_system" },
                            { "value": "cpu_io", "desc": "cpu_io" }
			]
		    }
                ]
            }
        },
        {
            "name": "IP",
            "type": "JSON",
            "settings": {
                "path": "statistic\/ip",
                "query": "{\n   \"timestamp\": {\n          \"from\": \"@from_ts\",\n          \"to\":  \"@to_ts\"\n   },\n  \"param\": {\n        \"filter\": [ \n             \"@filters\"\n       ],\n       \"limit\": \"@limit\",\n       \"total\": \"@total\"\n   }\n}",
                "method": "GET",
                "limit": 200,
                "total": false,
                "eval": {
                    incoming: {
                        name: "test incoming",
                        value: "var object = @incoming; return object"
                    }
                },
                "timefields" : [
                    { "field": "from_ts", "desc": "From Timestamp" },
                    { "field": "to_ts", "desc": "To Timestamp" }
                ],
                "fieldvalues": [
                    { "field": "total", "desc": "All Packets" }
                ],
                "filters": [
  		    { "type": "method", "desc": "SIP Method", options: [ {"value": "!ALL"},{"value":"!TOTAL"},{"value": "TOTAL"},{"value": "INVITE"},{"value": "UPDATE"}, {"value": "REGISTER"}, {"value": "CANCEL"}, {"value": "BYE"}, {"value": "OPTIONS"}, {"value": "300"}, {"value": "401"}, {"value": "407"}, {"value": "200"} ] },
                    { "type": "source_ip", "desc": "SIP Source IP", options: [] }
                ]
            }
        },
        {
            "name": "User-Agent",
            "type": "JSON",
            "settings": {
                "path": "statistic\/useragent",
                "query": "{\n   \"timestamp\": {\n          \"from\": \"@from_ts\",\n          \"to\":  \"@to_ts\"\n   },\n  \"param\": {\n        \"filter\": [ \n             \"@filters\"\n       ],\n       \"limit\": \"@limit\",\n       \"total\": \"@total\"\n   }\n}",
                "method": "GET",
                "limit": 200,
                "total": false,
                "eval": {
                    incoming: {
                        name: "test incoming",
                        value: "var object = @incoming; return object"
                    }
                },
                "timefields" : [
                    { "field": "from_ts", "desc": "From Timestamp" },
                    { "field": "to_ts", "desc": "To Timestamp" }
                ],
                "fieldvalues": [
                    { "field": "total", "desc": "All Packets" }
                ],
                "filters": [
  		    { "type": "useragent", "desc": "SIP User-Agent", options: [ {"value": "!ALL"},{"value":"!TOTAL"},{"value": "TOTAL"},{"value": "INVITE"},{"value": "UPDATE"}, {"value": "REGISTER"}, {"value": "CANCEL"}, {"value": "BYE"}, {"value": "OPTIONS"}, {"value": "300"}, {"value": "401"}, {"value": "407"}, {"value": "200"} ] },
  		    { "type": "method", "desc": "SIP Method", options: [ {"value": "!ALL"},{"value":"!TOTAL"},{"value": "TOTAL"},{"value": "INVITE"},{"value": "UPDATE"}, {"value": "REGISTER"}, {"value": "CANCEL"}, {"value": "BYE"}, {"value": "OPTIONS"}, {"value": "300"}, {"value": "401"}, {"value": "407"}, {"value": "200"} ] }
                ]
            }
        },
        {
            "name": "Alarms",
            "type": "JSON",
            "settings": {
                "path": "statistic\/alarm",
                "query": "{\n   \"timestamp\": {\n          \"from\": \"@from_ts\",\n          \"to\":  \"@to_ts\"\n   },\n  \"param\": {\n        \"filter\": [ \n             \"@filters\"\n       ],\n       \"limit\": \"@limit\",\n       \"total\": \"@total\"\n   }\n}",
                "method": "GET",
                "limit": 200,
                "total": false,
                "eval": {
                    incoming: {
                        name: "test incoming",
                        value: "var object = @incoming; return object"
                    }
                },
                "timefields" : [
                    { "field": "from_ts", "desc": "From Timestamp" },
                    { "field": "to_ts", "desc": "To Timestamp" }
                ],
                "fieldvalues": [
                    { "field": "total", "desc": "All Alarms" }
                ],
                "filters": [
  		    { "type": "source_ip", "desc": "Source IP", options: [ {"value": "0.0.0.0"} ] },
  		    { "type": "type", "desc": "Alarm Type", options: [ {"value": "scanner"} ] }
                ]
            }
        },
        {
            "name": "Geo Stats",
            "type": "JSON",
            "settings": {
                "path": "statistic\/country",
                "query": "{\n   \"timestamp\": {\n          \"from\": \"@from_ts\",\n          \"to\":  \"@to_ts\"\n   },\n  \"param\": {\n        \"filter\": [ \n             \"@filters\"\n       ],\n       \"limit\": \"@limit\",\n       \"total\": \"@total\"\n   }\n}",
                "method": "GET",
                "limit": 200,
                "total": false,
                "eval": {
                    incoming: {
                        name: "test incoming",
                        value: "var object = @incoming; return object"
                    }
                },
                "timefields" : [
                    { "field": "from_ts", "desc": "From Timestamp" },
                    { "field": "to_ts", "desc": "To Timestamp" }
                ],
                "fieldvalues": [
                    { "field": "total", "desc": "All Geo Stats" }
                ],
                "filters": [
  		    { "type": "method", "desc": "SIP Method", options: [ {"value": "!ALL"},{"value":"!TOTAL"},{"value": "TOTAL"},{"value": "INVITE"},{"value": "UPDATE"}, {"value": "REGISTER"}, {"value": "CANCEL"}, {"value": "BYE"}, {"value": "OPTIONS"}, {"value": "300"}, {"value": "401"}, {"value": "407"}, {"value": "200"} ] },
  		    { "type": "source_ip", "desc": "Source IP", options: [ {"value": "0.0.0.0"} ] },
  		    { "type": "country", "desc": "Source Country", options: [ {"value": "ALL"} ] }
                ]
            }
        },
		{
            "name": "Destination",
            "type": "JSON",
            "settings": {
                "path": "statistic\/destination",
                        "query": "{\n   \"timestamp\": {\n          \"from\": \"@from_ts\",\n          \"to\":  \"@to_ts\"\n   },\n  \"param\": {\n        \"filter\": [ \n             \"@filters\"\n       ],\n       \"limit\": \"@limit\",\n       \"total\": \"@total\"\n   }\n}",
                "method": "GET",
                "limit": 200,
                "total": false,
                "eval": {
                    incoming: {
                        name: "test incoming",
                        value: "var object = @incoming; return object"
                    }
                },
                "timefields" : [
                    { "field": "from_ts", "desc": "From Timestamp" },
                    { "field": "to_ts", "desc": "To Timestamp" }
                ],
                "fieldvalues": [
                    { "field": "total", "desc": "All Destination stats" }
                ],
                "filters": [
					{ "type": "country", "desc": "Destination Country", options: [ {"value": "ALL"}  ] },
					{ "type": "prefix", "desc": "Destination Prefix", options: [ {"value": "ALL"}  ] },
					{ "type": "method", "desc": "SIP Method", options: [ {"value": "ALL"}  ] },
					{ "type": "status_code", "desc": "SIP Status Code", options: [ {"value": "ALL"}  ] },
                ]
            }
        }

    ]
};
