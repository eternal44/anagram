var fs = require('fs');

var utils = {
  arrayifyFile: function arrayifyFile(filename, callback) {
    fs.readFile(filename, function (err, data) {
      if (err) throw err;

      var lines = data.toString('utf-8').split("\n");

      callback(null, lines);
    });
  },

  findPermutations: function findPermutations(str) {
    var permArr = []

    function buildPerm(rest, soFar) {
      var next;
      var remaining;

      if (rest == '') {
        permArr.push(soFar)

      } else {

        for (var i = 0; i < rest.length; i++) {
          remaining = rest.substr(0,i) + rest.substr(i+1,rest.length-1);
          next = soFar + rest[i];

          buildPerm(remaining, next);
        }
      }   
    }
    buildPerm(str, '')

    return permArr
  },

  wordSearch: function binarySearch(arr, word) {
    function search (arr, word) {
      var midPoint = Math.ceil(arr.length / 2)
      var currentWord = arr[midPoint].slice(0, arr[midPoint].length - 1)

      if(currentWord === word)
        return true

      if(arr.length === 1)
        return currentWord === word

      if(word < currentWord){
        var left = arr.slice(0, midPoint)
        search(left, word)
      } else if(word > currentWord) {
        var right = arr.slice(midPoint)
        search(right, word)
      }
    }
    return search(arr, word)
  } 
}

// console.log(utils.wordSearch(['bug/', 'good/', 'hello/', 'time/', 'zebra/'], 'hello'))

module.exports = utils

