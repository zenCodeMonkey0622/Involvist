//
//  String+Extensions.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 6/23/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation

extension String
{
    // extension method that capitalizes only the first letter of the string
    func sentenceCased() -> String
    {
        if (self.count > 0)
        {
            let firstChar = String(characters.prefix(1)).capitalized
            let remainingChars = String(characters.dropFirst())
            return firstChar + remainingChars;
        }
        else
        {
            return self
        }
    }
}
