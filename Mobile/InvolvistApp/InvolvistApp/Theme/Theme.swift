//
//  Theme.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/2/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation
import UIKit

struct Theme
{
    static var involvistPurple: UIColor
    {
        get
        {
            // evaluates to hex 0xb984d3ff
            return UIColor(red: 185.0/255.0, green: 132.0/255.0, blue: 211.0/255.0, alpha: 1.0)
        }
    }
    
    static var involvistDeepPurple: UIColor
    {
        get
        {
            // evaluates to hex 0x6a1b9aff
            return UIColor(red: 106.0/255.0, green: 27.0/255.0, blue: 154.0/255.0, alpha: 1.0)
        }
    }
}
