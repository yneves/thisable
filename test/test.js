// - -------------------------------------------------------------------- - //
// - libs

var Thisable = require("../");

var assert = require("assert");

// - -------------------------------------------------------------------- - //
// - Thisable

describe("Thisable",function() {

	require("promises-aplus-tests").mocha({
		deferred: function () {
			var promise = new Thisable();
			return {
				promise: promise,
				resolve: function (value) {
					return promise.fulfill(value);
				},
				reject: function (reason) {
					return promise.reject(reason);
				}
			};
		}
	});

	it("context-then",function(done) {
		var obj = {a:1,b:2,c:3};
		var promise = new Thisable();
		promise.bind(obj);
		promise.then(function(value) {
			assert.strictEqual(value,true);
			assert.strictEqual(this,obj);
			assert.deepEqual(this,{a:1,b:2,c:3});
			done();
		},function(error) {
			done(error);
		});
		setTimeout(function() {
			promise.fulfill(true);
		},1);
	});

	it("context-fail",function(done) {
		var obj = {a:1,b:2,c:3};
		var promise = new Thisable();
		promise.bind(obj);
		promise.then(function(value) {
			done(new Error("should have failed"));
		},function(error) {
			assert.strictEqual(this,obj);
			assert.deepEqual(this,{a:1,b:2,c:3});
			done();
		});
		setTimeout(function() {
			promise.reject(true);
		},1);
	});

});

// - -------------------------------------------------------------------- - //