//
//  UserService.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/24/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation
import Alamofire

class UserService: UserServiceDelegate
{
    func register(user: User, success: @escaping () -> Void, fail: @escaping () -> Void)
    {
        let parameters: Parameters = ["real_name": user.fullName,
                                      "password": user.clearTextPassword,
                                      "email": user.loginName]
        let headers: HTTPHeaders = ["Content-Type": ContentType.json.rawValue]
        
        Alamofire.request(ApiEndpoint.userRegistration.rawValue,
                          method: .post,
                          parameters: parameters,
                          encoding: JSONEncoding.default,
                          headers: headers).responseJSON {(response: DataResponse<Any>) in
                            guard let statusCode = response.response?.statusCode else
                            {
                                fail()
                                return
                            }
                            
                            guard let json = response.value as? [String: Any] else
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
