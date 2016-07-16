var async = require('async')
var helper = require('./helper')

function findAnagram(word) {
  async.waterfall([
    function(done) {
      helper.arrayifyFile('./Word_List.txt', function(err, lines) {
        if(err)
          return done(err)

        done(null, lines)
      })
    },

    function(lines, done) {
      var perms = helper.findPermutations(word)
      done(null, lines, perms)
    },

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


    // console.log(lines, permutations)
  })
}

findAnagram('silent')
