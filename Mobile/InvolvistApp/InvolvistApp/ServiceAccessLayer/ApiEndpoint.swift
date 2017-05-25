//
//  ApiEndpoint.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/24/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation

enum ApiEndpoint: String
{
    case authenticate = "http://localhost:3000/oauth/token"
    case userRegistration = "http://localhost:3000/api/v1/registration"
}
