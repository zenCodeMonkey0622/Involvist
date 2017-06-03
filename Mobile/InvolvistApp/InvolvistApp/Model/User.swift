//
//  User.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/12/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation

class User
{
    var fullName: String
    var loginName: String
    var clearTextPassword: String
    
    var firstName: String
    {
        get
        {
            return getFirstName()
        }
    }
    
    init(fullName: String, loginName: String, clearTextPassword: String)
    {
        self.fullName = fullName
        self.loginName = loginName
        self.clearTextPassword = clearTextPassword
    }
    
    // failable initializer that takes a nullable deserialized json object
    // to construct a User
    init?(json: Any?)
    {
        guard let userData = json as? [String: Any], let fn = userData["realName"] as? String, let ln = userData["userName"] as? String else
        {
            return nil
        }
        
        fullName = fn
        loginName = ln
        clearTextPassword = ""
    }
    
    fileprivate func getFirstName() -> String
    {
        return fullName.components(separatedBy: " ")[0]
    }
    
}
