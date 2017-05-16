//
//  Authenticator.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/12/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation
import Alamofire

let AUTH_BASE_URI = "http://localhost:3000/oauth/token"

// implements the AuthService protocol
public class Authenticator: AuthService
{
    func authenticate(user: User, success: @escaping () -> Void, fail: @escaping () -> Void)
    {
        let parameters: Parameters = ["grant_type": "password",
                                      "username": user.loginName,
                                      "password": user.clearTextPassword,
                                      "client_id": "1"]
        let headers: HTTPHeaders = ["Content-Type": "application/x-www-form-urlencoded"]
        

        Alamofire.request(AUTH_BASE_URI, method: .post, parameters: parameters, encoding: URLEncoding.default, headers: headers).responseJSON {(response: DataResponse<Any>) in
            
            print("JSON response: \(response)")
            guard let statusCode = response.response?.statusCode else
            {
                fail()
                return
            }
            
            if (statusCode >= 200 && statusCode <= 299)
            {
                success()
            }
            else
            {
                fail()
            }
        }
    }
}
