db.rsr_current_bill_115.aggregate([
    {
        "$group": {
            "_id": { "number": "$number"},
            "uniqueIds": { "$addToSet": "$_id" },
            "count": { "$sum": 1}
        }
    },
    { "$match": { "count": { "$gt": 1} } }
])