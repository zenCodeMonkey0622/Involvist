//
//  SignUpProgressDelegate.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 6/2/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation

protocol SignUpProgressDelegate: class
{
    func didCancelSignUp()
    func didRegisterUser(newUser: User)
    func didLocateUser()
    func didFinishSignUp()
}
