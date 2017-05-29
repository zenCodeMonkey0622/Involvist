//
//  UserServiceDelegate.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/24/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation

protocol UserServiceDelegate: class
{
    func register(user: User, success: @escaping (_: ClientServiceResponse?) -> Void, fail: @escaping (_: ClientServiceResponse?) -> Void)
}
