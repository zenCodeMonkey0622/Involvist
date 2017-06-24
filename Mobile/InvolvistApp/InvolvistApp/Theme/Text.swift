//
//  Text.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 6/23/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation
import UIKit

enum CapitalizationStyle
{
    case SentenceCase
    case CaptalizedWords
    case AllUppercase
    case AllLowercased
}

struct Text
{
    fileprivate static var capitalizationStyle: CapitalizationStyle = CapitalizationStyle.AllLowercased
    
    static func setCapStyle(capStyle: CapitalizationStyle)
    {
        capitalizationStyle = capStyle
    }
    
    static func LocalizedString(_ key: String) -> String
    {
        let localizedString = NSLocalizedString(key, comment: "")
        
        switch capitalizationStyle
        {
        case CapitalizationStyle.AllLowercased:
            return localizedString.lowercased()
        case CapitalizationStyle.AllUppercase:
            return localizedString.uppercased()
        case CapitalizationStyle.CaptalizedWords:
            return localizedString.capitalized
        case CapitalizationStyle.SentenceCase:
            return localizedString.sentenceCased()
        }
    }
}
