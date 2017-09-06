// rsrDropAllCollections.js
// drops all extraneous collections that are created during
// standard test operations

// drop the frame collections
db.getCollection("accounts").drop()
db.getCollection("tokens").drop()
db.getCollection("sessions").drop()
db.getCollection("statuses").drop()
db.getCollection("auth_attempts").drop()

// drop the rousr collections
db.getCollection("rsr_congress_member_115").drop()
db.getCollection("rsr_current_bill_115").drop()
db.getCollection("rsr_users").drop()