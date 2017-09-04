// the test data is rousr users. we don't need to create associated
// frame users since these tests are more concerned with rousr entiteis
// and not authentication (password data unneeded)

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
    }
])