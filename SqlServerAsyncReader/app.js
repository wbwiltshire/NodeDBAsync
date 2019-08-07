//ES7 application using async / await and request-promise to retrieve data from a SQL Server database
//Links: https://github.com/tediousjs/node-mssql

const sql = require('./sqllib.js');

// Main function (start things as closure to get into async mode

(async function () {
	var conn = await sql.openDB();
	
	try {
		if (sql.isOpen) {
			
			var cnt = await sql.findAll(); 
			console.log('\nRows processed: ', cnt);
		
			await sql.closeDB();
			process.exit(0);
		}
		else
			console.log('DB not open');
	}
	catch (err) {
		console.log('Exception: ', err);
		process.exit(1);
	}
})();

