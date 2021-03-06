'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _code128b;

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Data for each character
// The last characters will not be encoded but are used for error correction
var code128b = (_code128b = {
  ' ': ['11011001100', 0],
  '!': ['11001101100', 1],
  '"': ['11001100110', 2],
  '#': ['10010011000', 3],
  '$': ['10010001100', 4],
  '%': ['10001001100', 5],
  '&': ['10011001000', 6],
  '\'': ['10011000100', 7],
  '(': ['10001100100', 8],
  ')': ['11001001000', 9],
  '*': ['11001000100', 10],
  '+': ['11000100100', 11],
  ',': ['10110011100', 12],
  '-': ['10011011100', 13],
  '.': ['10011001110', 14],
  '/': ['10111001100', 15],
  '0': ['10011101100', 16],
  '1': ['10011100110', 17],
  '2': ['11001110010', 18],
  '3': ['11001011100', 19],
  '4': ['11001001110', 20],
  '5': ['11011100100', 21],
  '6': ['11001110100', 22],
  '7': ['11101101110', 23],
  '8': ['11101001100', 24],
  '9': ['11100101100', 25],
  ':': ['11100100110', 26],
  ';': ['11101100100', 27],
  '<': ['11100110100', 28],
  '=': ['11100110010', 29],
  '>': ['11011011000', 30],
  '?': ['11011000110', 31],
  '@': ['11000110110', 32],
  'A': ['10100011000', 33],
  'B': ['10001011000', 34],
  'C': ['10001000110', 35],
  'D': ['10110001000', 36],
  'E': ['10001101000', 37],
  'F': ['10001100010', 38],
  'G': ['11010001000', 39],
  'H': ['11000101000', 40],
  'I': ['11000100010', 41],
  'J': ['10110111000', 42],
  'K': ['10110001110', 43],
  'L': ['10001101110', 44],
  'M': ['10111011000', 45],
  'N': ['10111000110', 46],
  'O': ['10001110110', 47],
  'P': ['11101110110', 48],
  'Q': ['11010001110', 49],
  'R': ['11000101110', 50],
  'S': ['11011101000', 51],
  'T': ['11011100010', 52],
  'U': ['11011101110', 53],
  'V': ['11101011000', 54],
  'W': ['11101000110', 55],
  'X': ['11100010110', 56],
  'Y': ['11101101000', 57],
  'Z': ['11101100010', 58],
  '': ['11100011010', 59],
  '\\': ['11101111010', 60],
  ']': ['11001000010', 61],
  '^': ['11110001010', 62],
  '_': ['10100110000', 63],
  '`': ['10100001100', 64],
  'a': ['10010110000', 65],
  'b': ['10010000110', 66],
  'c': ['10000101100', 67],
  'd': ['10000100110', 68],
  'e': ['10110010000', 69],
  'f': ['10110000100', 70],
  'g': ['10011010000', 71],
  'h': ['10011000010', 72],
  'i': ['10000110100', 73],
  'j': ['10000110010', 74],
  'k': ['11000010010', 75],
  'l': ['11001010000', 76],
  'm': ['11110111010', 77],
  'n': ['11000010100', 78],
  'o': ['10001111010', 79],
  'p': ['10100111100', 80],
  'q': ['10010111100', 81],
  'r': ['10010011110', 82],
  's': ['10111100100', 83],
  't': ['10011110100', 84],
  'u': ['10011110010', 85],
  'v': ['11110100100', 86],
  'w': ['11110010100', 87],
  'x': ['11110010010', 88],
  'y': ['11011011110', 89],
  'z': ['11011110110', 90],
  '{': ['11110110110', 91],
  '|': ['10101111000', 92],
  '}': ['10100011110', 93],
  '~': ['10001011110', 94]
}, (0, _defineProperty3.default)(_code128b, String.fromCharCode(127), ['10111101000', 95]), (0, _defineProperty3.default)(_code128b, String.fromCharCode(128), ['10111100010', 96]), (0, _defineProperty3.default)(_code128b, String.fromCharCode(129), ['11110101000', 97]), (0, _defineProperty3.default)(_code128b, String.fromCharCode(130), ['11110100010', 98]), (0, _defineProperty3.default)(_code128b, String.fromCharCode(131), ['10111011110', 99]), (0, _defineProperty3.default)(_code128b, String.fromCharCode(132), ['10111101110', 100]), (0, _defineProperty3.default)(_code128b, String.fromCharCode(133), ['11101011110', 101]), (0, _defineProperty3.default)(_code128b, String.fromCharCode(134), ['11110101110', 102]), (0, _defineProperty3.default)(_code128b, String.fromCharCode(135), ['11010000100', 103]), (0, _defineProperty3.default)(_code128b, String.fromCharCode(136), ['11010010000', 104]), (0, _defineProperty3.default)(_code128b, String.fromCharCode(137), ['11010011100', 105]), _code128b);

var endBin = '1100011101011';
var validRe = /^[!-~ ]+$/;

var CODE128 = function () {
  function CODE128(code) {
    (0, _classCallCheck3.default)(this, CODE128);

    this.code = String(code);
  }

  (0, _createClass3.default)(CODE128, [{
    key: 'isValid',
    value: function isValid() {
      return validRe.test(this.code);
    }
  }, {
    key: 'encode',
    value: function encode() {
      var result = '';

      //Add the start bits
      result += this.encodingById(this.startCode);

      //Add the encoded bits
      result += this.encodeClass();

      //Add the checksum
      result += this.encodingById(this.checksum());

      //Add the end bits
      result += endBin;

      return result;
    }
  }, {
    key: 'encodingById',
    value: function encodingById(id) {
      for (var key in code128b) {
        var code = code128b[key];
        if (code[1] === id) {
          return code[0];
        }
      }
      return '';
    }
  }, {
    key: 'weightByCharacter',
    value: function weightByCharacter(char) {
      var code = code128b[char];
      if (!code) return 0;
      return code[1];
    }
  }, {
    key: 'encodingByChar',
    value: function encodingByChar(char) {
      var code = code128b[char];
      if (!code) return '';
      return code[0];
    }
  }]);
  return CODE128;
}();

exports.default = CODE128;