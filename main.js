/*
  Import the built-in path module.
  See https://nodejs.org/api/path.html
  The path module provides utilities for working with file and directory paths.
  IAP requires the path module to access local file modules.
  The path module exports an object.
  Assign the imported object to variable path.
*/
const path = require('path');

/**
 * Import helper function module located in the same directory
 * as this module. IAP requires the path object's join method
 * to unequivocally locate the file module.
 */
const { getIpv4MappedIpv6Address } = require(path.join(__dirname, 'ipv6.js'));


/*
  Import the ip-cidr npm package.
  See https://www.npmjs.com/package/ip-cidr
  The ip-cidr package exports a class.
  Assign the class definition to variable IPCIDR.
*/
const IPCIDR = require('ip-cidr');

/**
 * @class Ipv4Ipv6
 * @type {Object}
 * @property {string} ipv4
 * @property {string} ipv6 -the IPv6 mapped from the IPv4 in the object
 */
 function Ipv4Ipv6(ipv4,ipv6) {
     return {
         ipv4: ipv4,
         ipv6: ipv6
     }
 }


/**
 * Calculate and return the first host IP address from a CIDR subnet.
 * @param {string} cidrStr - The IPv4 subnet expressed
 *                 in CIDR format.
 * @param {callback} callback - A callback function.
 * @return {Ipv4Ipv6} - If successful, this will be a Json object containing the (firstIPAddress, mappedIP6Address). (expecting exactly two values).
 */

/*
function getFirstIpAddress(cidrStr, callback) {

  // Initialize return arguments for callback
  let firstIpAddress = null;
  let callbackError = null; 

  let successfulRespJson = {ipv4:null,ipv6:null};

  // Instantiate an object from the imported class and assign the instance to variable cidr.
  const cidr = new IPCIDR(cidrStr);
  // Initialize options for the toArray() method.
  // We want an offset of one and a limit of one.
  // This returns an array with a single element, the first host address from the subnet.
  const options = {
    from: 1,
    limit: 1
  };
 log.info('**** getFirstIpAddress input cidr = ' + cidr);
  // Use the object's isValid() method to verify the passed CIDR.
  if (!cidr.isValid()) {
    // If the passed CIDR is invalid, set an error message.
    callbackError = 'Error: Invalid CIDR passed to getFirstIpAddress.';
  } else {
    // If the passed CIDR is valid, call the object's toArray() method.
    // Notice the destructering assignment syntax to get the value of the first array's element.
    [firstIpAddress] = cidr.toArray(options);

    //call to get the IPv6 for the returned IPv4
    let respIPv6 = getIpv4MappedIpv6Address(firstIpAddress);
    successfulRespJson = Ipv4Ipv6(firstIpAddress,respIPv6);
  }
  // Call the passed callback function.
  // Node.js convention is to pass error data as the first argument to a callback.
  // The IAP convention is to pass returned data as the first argument and error
  // data as the second argument to the callback function.
  return callback(successfulRespJson, callbackError);
}
*/

class IpAddress {
    constructor() {
        // IAP's global log object is used to output errors, warnings, and other
        // information to the console, IAP's log files, or a Syslog server.
        // For more information, consult the Log Class guide on the Itential
        // Developer Hub https://developer.itential.io/ located
        // under Documentation -> Developer Guides -> Log Class Guide
        log.info('Starting the IpAddress product.');
    }

//// added getFirstIpAddr START
    getFirstIpAddress(cidrStr, callback) {

        // Initialize return arguments for callback
        let firstIpAddress = null;
        let callbackError = null; 

        let successfulRespJson = {ipv4:null,ipv6:null};

        // Instantiate an object from the imported class and assign the instance to variable cidr.
        const cidr = new IPCIDR(cidrStr);
        // Initialize options for the toArray() method.
        // We want an offset of one and a limit of one.
        // This returns an array with a single element, the first host address from the subnet.
        const options = {
            from: 1,
            limit: 1
        };
        log.info('**** getFirstIpAddress input cidr = ' + cidr);
        // Use the object's isValid() method to verify the passed CIDR.
        if (!cidr.isValid()) {
            // If the passed CIDR is invalid, set an error message.
            callbackError = 'Error: Invalid CIDR passed to getFirstIpAddress. cidrStr = '+ cidrStr;
        } else {
            // If the passed CIDR is valid, call the object's toArray() method.
            // Notice the destructering assignment syntax to get the value of the first array's element.
            [firstIpAddress] = cidr.toArray(options);

            //call to get the IPv6 for the returned IPv4
            let respIPv6 = getIpv4MappedIpv6Address(firstIpAddress);
            successfulRespJson = Ipv4Ipv6(firstIpAddress,respIPv6);
        }
        // Call the passed callback function.
        // Node.js convention is to pass error data as the first argument to a callback.
        // The IAP convention is to pass returned data as the first argument and error
        // data as the second argument to the callback function.
        return callback(successfulRespJson, callbackError);
    }
//// added getFirstIpAddr END
}

module.exports = new IpAddress;
