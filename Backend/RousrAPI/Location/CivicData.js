// CivicData.js
// represents civic data

'using strict';

class CivicData {
    constructor() {
        this.state = '';
        this.districtNumber = -1;
    }
}

module.exports = {

    /**
     * factory method for creating a null CivicData object
     */
    makeNullCivicData: function() {
        return new CivicData();
    },

    /**
     * factory method for creating a CivicData object
     * @param {string} state
     * @param {int} districtNumber 
     */
    makeCivicData: function(state, districtNumber)
    {
        var cd = new CivicData();
        cd.districtNumber = districtNumber;
        cd.state = state

        return cd;
    }
}
