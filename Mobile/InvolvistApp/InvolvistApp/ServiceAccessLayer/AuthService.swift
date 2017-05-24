//
//  AuthService.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/12/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation

// provides a protocol for authentication services
protocol AuthService: class
{
    func register(user: User, success: @escaping () -> Void, fail: @escaping () -> Void)
    func authenticate(user: User, success: @escaping () -> Void, fail: @escaping () -> Void)
}
