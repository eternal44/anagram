var async = require('async')
var helper = require('./helper')

function findAnagram(word) {
  async.waterfall([

    // turn word list into an array so we can look up words
    function(done) {
      helper.arrayifyFile('./Word_List.txt', function(err, lines) {
        if(err)
          return done(err)

        done(null, lines)
      })
    },

    // generate permutations of words in anagram
    function(lines, done) {
      var perms = helper.findPermutations(word)
      done(null, lines, perms)
    },

    // search through word list to validate permutation
    function(lines, permutations, done) {
      var possibleAnagramSets = []
      for(var i = 0; i < permutations.length; i++) {
        if(helper.wordSearch(lines, permutations[i]))
          possibleAnagramSets.push(permutations[i])
      }
      done(possibleAnagramSets)
    },

  ], function(err, anagrams) {
    if(err)
      return console.err(err)

    // TODO:  
    // recurse through available characters
    //   create permutations of subsets of characters
    //   push results into result array

    // console.log(lines, permutations)
  })
}

findAnagram('silent')
