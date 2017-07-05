// subjectCacheBill.js
// defines a schema to represent bill cache data that fills a subject collection.
// the subject collection acts as a cache for querying bills by primary_subject.

'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var SubjectCacheBillSchema = new Schema(
    {
        primary_subject: String,
        number: String,
    }
);

// export only the schema object so that we can build mongoose Model objects
// at runtime as the need necessitates. since there can be any number of primary subject values
// we can't predict which primary subjects we need to create models from using the schema. so we simply
// make the schema available.
module.exports.SubjectCacheBillSchema = SubjectCacheBillSchema;
