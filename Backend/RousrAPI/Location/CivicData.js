// CivicData.js
// represents civic data

'using strict';

module.exports = makeCivicData;

class CivicData {
    constructor() {
        this.congressionalDistrict = '';
    }
}

module.exports = {

    /**
     * factory method for creating a null CivicData object
     */
    makeNullCivicData: function() {
        var cd = new CivicData();

        return cd;
    },

    /**
     * factory method for creating a CivicData object
     * @param {string} congressionalDistrict 
     */
    makeCivicData: function(congressionalDistrict)
    {
        var cd = new CivicData();
        cd.congressionalDistrict = congressionalDistrict

        return cd;
    }
}
