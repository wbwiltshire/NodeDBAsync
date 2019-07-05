//Node application using tedious to retrieve data from a SQL Server database
// Links: https://www.microsoft.com/en-us/sql-server/developer-get-started/node/windows
//        http://tediousjs.github.io/tedious/
//        https://docs.microsoft.com/en-us/sql/connect/node-js/step-3-proof-of-concept-connecting-to-sql-using-node-js?view=sql-server-2017

  var Connection = require('tedious').Connection;
  var Request = require('tedious').Request;
  var async = require('async');

  // SQL Server Admin config
  // var config = {
    // server: 'SCHVW2K12R2-DB',
    // userName: 'sa',
    // password: '********',
	// options: {
		// instanceName: 'MSSQL2016',
		// database: 'DCustomer',
        // // If you're on Windows Azure, you will need this:
        // //encrypt: true
		// encrypt: false
    // }
  // };
  
  // Domain User config
    var config = {
      server: 'SCHVW2K12R2-DB',
	  domain: 'SEAGULL',
	  userName: 'wbw07',
	  password: '********',
	  options: {
		instanceName: 'MSSQL2016',
		trustedConnection: true,
		//database: 'DCustomer',
		database: 'DPTS',
		encrypt: false
      }
    };
	config.options.debug = {
		data: true,
		payload: false,
		token: false,
		packet: true,
		log: true
	};

  var connection = new Connection(config);
  console.log(config);
  
  function FindTopAll(callback){
	request = new Request(
//	  'SELECT LastName, FirstName FROM Contact;',
	  'SELECT TOP(10) * FROM StorePollStatus;',
	  function(err, rowCount, rows) {
	    if (err) {
			callback(null);
		}
		else {
		    console.log('\n' + rowCount + ' row(s) returned\n');
			callback(null);
		}
	  }
	);
	
	// Print the rows read
    var result = "|";
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + "|";
            }
        });
        console.log(result);
        result = "|";
    });
	
	connection.execSql(request);
	
  };
  
  function Complete(err, result) {
  	if (err) {
		callback(err);
	}
	else {
		console.log("Done!");
	}
	process.exit(1);
  };
  
  connection.on('connect', function(err) {
	if (err) {
		console.log(err);
	}
	else {
		console.log('Connected\n');
	
		// async.waterfall([
		// FindTopAll
		// ], Complete);
		FindTopAll(function (data) {
			Complete;
		});
	};
  });
