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
    
    init(fullName: String, loginName: String, clearTextPassword: String)
    {
        self.fullName = fullName
        self.loginName = loginName
        self.clearTextPassword = clearTextPassword
    }
}
