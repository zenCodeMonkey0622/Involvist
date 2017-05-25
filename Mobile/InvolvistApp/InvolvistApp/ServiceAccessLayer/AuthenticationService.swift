//
//  AuthenticationService.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/12/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation
import Alamofire

let AUTH_BASE_URI = "http://localhost:3000/oauth/token"

// implements the AuthServiceDelegate protocol
public class AuthenticationService: AuthServiceDelegate
{
    func authenticate(user: User, success: @escaping () -> Void, fail: @escaping () -> Void)
    {
        let parameters: Parameters = ["grant_type": "password",
                                      "username": user.loginName,
                                      "password": user.clearTextPassword,
                                      "client_id": "1"]
        let headers: HTTPHeaders = ["Content-Type": ContentType.formUrlEncoded.rawValue]
        
        Alamofire.request(ApiEndpoint.authenticate.rawValue,
                          method: .post,
                          parameters: parameters,
                          encoding: URLEncoding.default,
                          headers: headers).responseJSON {(response: DataResponse<Any>) in
                            guard let statusCode = response.response?.statusCode else
                            {
                                fail()
                                return
                            }
                            if (statusCode >= 200 && statusCode <= 299)
                            {
                                guard let json = response.value as? [String: Any], let authResponse = AuthResponse(json: json) else
                                {
                                    fail()
                                    return
                                }
                                print("\(authResponse)")
                                success()
                            }
                            else
                            {
                                fail()
                            }
        }
    }
}
