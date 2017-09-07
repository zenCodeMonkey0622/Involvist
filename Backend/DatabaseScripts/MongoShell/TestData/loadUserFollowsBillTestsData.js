// the test data is rousr users. we don't need to create associated
// frame users since these tests are more concerned with rousr entiteis
// and not authentication (password data unneeded).

// the {ordered: false} option specifies that if there is a problem with one document
// it will skip and attempt the remainder. we use this b/c mongo will throw a
// duplicate id error if we try to add the same document again. we want to
// continue the insertion in the case of adding another item to the list without
// needing to scrub the entire array of documents from the db.

db.getCollection("rsr_users").insert([
    {
        _id: 'tst_userfollows_unauth_rsruid',
        email: 'tst_userfollows_unauth@rsr.io',
        realName: 'tst_userfollows_unauth_realname',
        userName: 'tst_userfollows_unauth_username',
        rsrUid: 'tst_userfollows_unauth_rsruid',
        followingBills: []
    },
    {
        _id: 'tst_userfollows_addbill_rsruid',
        email: 'tst_userfollows_addbill@rsr.io',
        realName: 'tst_userfollows_addbill_realname',
        userName: 'tst_userfollows_addbill_username',
        rsrUid: 'tst_userfollows_addbill_rsruid',
        followingBills: []
    },
    {
        _id: 'tst_userfollows_addbilltwice_rsruid',
        email: 'tst_userfollows_addbilltwice@rsr.io',
        realName: 'tst_userfollows_addbilltwice_realname',
        userName: 'tst_userfollows_addbilltwice_username',
        rsrUid: 'tst_userfollows_addbilltwice_rsruid',
        followingBills: []
    },
    {
        _id: 'tst_userfollows_createmeta_rsruid',
        email: 'tst_userfollows_createmeta@rsr.io',
        realName: 'tst_userfollows_createmeta_realname',
        userName: 'tst_userfollows_createmeta_username',
        rsrUid: 'tst_userfollows_createmeta_rsruid',
        followingBills: []
    },
    {
        _id: 'tst_userfollows_onlyonemeta_rsruid',
        email: 'tst_userfollows_onlyonemeta@rsr.io',
        realName: 'tst_userfollows_onlyonemeta_realname',
        userName: 'tst_userfollows_onlyonemeta_username',
        rsrUid: 'tst_userfollows_onlyonemeta_rsruid',
        followingBills: []
    },
    {
        _id: 'tst_userfollows_invalidbill_rsruid',
        email: 'tst_userfollows_invalidbill@rsr.io',
        realName: 'tst_userfollows_invalidbill_realname',
        userName: 'tst_userfollows_invalidbill_username',
        rsrUid: 'tst_userfollows_invalidbill_rsruid',
        followingBills: []
    }
], { ordered: false })