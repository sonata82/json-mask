/* global describe, it */

var filter = require('../lib/filter')
var assert = require('assert')
var compiledMask
var object
var expected

// a,b(d/*/z,b(g)),c,h(!a)
compiledMask = {
  a: {type: 'object'},
  b: {
    type: 'array',
    properties: {
      d: {
        type: 'object',
        properties: {
          '*': {
            type: 'object',
            properties: {
              z: {type: 'object'}
            }
          }
        }
      },
      b: {
        type: 'array',
        properties: {
          g: {type: 'object'}
        }
      }
    }
  },
  c: {type: 'object'},
  h: {
    type: 'array',
    properties: {
      '!a': {
        type: 'object'
      }
    }
  }
}

object = {
  a: 11,
  n: 0,
  b: [{
    d: {g: {z: 22}, b: 34, c: {a: 32}},
    b: [{z: 33}],
    k: 99
  }],
  c: 44,
  g: 99,
  h: [{a: 11, b: 22, c: 33}, {a: 44, b: 55, c: 66}]
}

expected = {
  a: 11,
  b: [{
    d: {
      g: {
        z: 22
      },
      c: {}
    },
    b: [{}]
  }],
  c: 44,
  h: [{b: 22, c: 33}, {b: 55, c: 66}]
}

describe('filter', function () {
  it('should filter object for a compiled mask', function () {
    assert.deepEqual(filter(object, compiledMask), expected)
  })
})
