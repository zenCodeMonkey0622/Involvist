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
    var readablePassword: String
    
    init(loginName: String, readablePassword: String)
    {
        self.loginName = loginName
        self.readablePassword = readablePassword
    }
}
