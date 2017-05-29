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
    func register(user: User, success: @escaping (_: ClientServiceResponse?) -> Void, fail: @escaping (_: ClientServiceResponse?) -> Void)
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
                            guard let json = response.value as? [String: Any],
                                let response = ClientServiceResponse(json: json) else
                            {
                                fail(nil)
                                return
                            }
                            if (response.success == true)
                            {
                                success(ClientServiceResponse(json: json))
                            }
                            else
                            {
                                fail(ClientServiceResponse(json: json))
                            }
        }
    }
}
