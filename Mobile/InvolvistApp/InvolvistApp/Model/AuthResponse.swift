//
//  AuthResponse.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/20/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation

// models the authentication response from the authenticate user api
struct AuthResponse
{
    let accessToken: String
    let expiresIn: String
    let tokenType: String
    
    // initializes a AuthResponse object from
    // a deserialized json dictionary
    init?(json: [String: Any])
    {
        guard let at = json["access_token"] as? String,
              let exp = json["expires_in"] as? String,
              let type = json["token_type"] as? String else
        {
            return nil
        }
        
        accessToken = at
        expiresIn = exp
        tokenType = type
    }
}
