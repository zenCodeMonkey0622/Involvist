// renames the Rousr User's userID field to rsrUid

db.getCollection("rsr_users").updateMany( {}, { $rename: {"userID": "rsrUid"}});
                                                                     