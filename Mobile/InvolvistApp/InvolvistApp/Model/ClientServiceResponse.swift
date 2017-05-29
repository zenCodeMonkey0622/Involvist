//
//  ClientServiceResponse.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/28/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation

struct ClientServiceResponse
{
    let success: Bool
    let responseMessage: String
    
    init?(json: [String: Any])
    {
        guard let success = json["success"] as? Bool,
            let message = json["responseMessage"] as? String else
        {
            return nil
        }
        
        self.success = success
        self.responseMessage = message
    }
}
