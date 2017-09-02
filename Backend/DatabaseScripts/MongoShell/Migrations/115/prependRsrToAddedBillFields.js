// replaces Bill fields primary_subjects, tags, description, and name to
// rsr_primary_subjects, rsr_tags, rsr_description, and rsr_name

db.getCollection("rsr_current_bill_115").updateMany( {}, { $rename: {"primary_subjects": "rsr_primary_subjects",
                                                                     "tags": "rsr_tags",
                                                                     "description": "rsr_description",
                                                                     "name": "rsr_name"}});
                                                                     