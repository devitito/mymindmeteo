/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var Transform = require('stream').Transform;
var util = require('util');
util.inherits(parser, Transform);

module.exports.new = function(options)
{
	var p = new parser(options);
	p.setEncoding('utf8');
	return p;
};

function parser(options)
{
	this.mindid = options.mindid;
	if (!(this instanceof parser))
		return new parser(options);

	Transform.call(this, options);
};


parser.prototype._transform = function(data, encoding, done) {
	var anchors = parseAnchors(data);
	var replaced = data;
	var context = this;

	async.each(anchors, function(anchor, callback) {
		console.log("mindid : " + context.mindid);
		ElasticService.request('record-answer', {id: context.mindid, topic:anchor.topic, range:anchor.range})
		.then(function(answer) {
			anchor.answer = answer;
			callback();
		})
		.catch(function(err) {
			callback(err);
		});
	},
	function (err) {
		if (err) {
			done(err);
		}
		else {
			anchors.forEach(function(anchor) {
				replaced = replaced.replace(anchor.raw, anchor.answer.en);
			});
			done();
		}
	});

};

function parseAnchors(data)
{
	var res = [];
	var samples = data.match(/{{([0-9a-zA-Z:]+)}}/g);
	res = _.map(samples, function(sample) {
		var anchor = sample.match(/([0-9a-zA-Z]+)/g);
		return {raw: sample, topic: anchor[0], range: anchor[1]};
	});
	return res;
};
