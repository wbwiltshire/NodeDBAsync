var fs = require('fs');
var sql = require('mssql');
const JSON_COLUMN_ID = 'JSON_F52E2B61-18A1-11d1-B105-00805F49916B'

var configurationFile = 'config.json';
var config = JSON.parse(
    fs.readFileSync(configurationFile, 'utf8')
);

var pool;
var isOpen;
var errNo;

function IsOpen() {
	return isOpen;
}

function ErrNo() {
	return errNo;
}

async function OpenDB() {
	
	isOpen = false;
	try {
		pool = await sql.connect(config);
		//console.log('pool', pool);
		isOpen = true;
		console.log('connection open');
	} 
	catch (err) {
		console.log('connection error:', err);
		pool = null;
		errNo = err;
	}
	
	return isOpen;
}
 
async function CloseDB() {
	if (isOpen) {
		console.log('closing connection');
		await pool.close();
		await sql.close();
	}
	isOpen = false;
}

async function FindAll(){
	var count = 0;
	try {
		console.log('FindAll');
		var result = await pool.request().query('SELECT Id, LastName, FirstName FROM Contact;');
		for (row of result.recordset) {
			count++;
			console.log('Name: ' + row.LastName + ', ' + row.FirstName + '(' +  row.Id + ')');
		}
	}
	catch (err) {
		console.log(err);
		process.exit(1);
	}
	
	return count;
}


module.exports.isOpen = IsOpen;
module.exports.errNo = ErrNo;
module.exports.openDB = OpenDB;
module.exports.closeDB = CloseDB;
module.exports.findAll = FindAll;
