//
//  User.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/12/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation

public class User
{
    var loginName: String
    var clearTextPassword: String
    
    init(loginName: String, clearTextPassword: String)
    {
        self.loginName = loginName
        self.clearTextPassword = clearTextPassword
    }
}
