// stringParse.js
// a string parsing utility
'use strict';

module.exports = {

    /**
     * parsePrimarySubjects - returns an array of primary subject strings
     * @param <String> - primarySubjectField
     */
    parsePrimarySubjects: function(primarySubjectField)
    {
        if (primarySubjectField == null || primarySubjectField == '')
            return [];
        
        // regex is a comma followed by 0 or more spaces
        const regEx = /,\s*/g;

        return primarySubjectField.split(regEx)
    }
}
