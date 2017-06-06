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
    // https://material.io/color/#!/?view.left=0&view.right=1&primary.color=870736&secondary.color=CFD8DC
    
    static var primary: UIColor
    {
        get
        {
            // evaluates to hex 0x880e4fff
            return UIColor(red: 136.0/255.0, green: 14.0/255.0, blue: 79.0/255.0, alpha: 1.0)
        }
    }
    
    static var primaryDark: UIColor
    {
        get
        {
            // evaluates to hex 0x560027ff
            return UIColor(red: 86.0/255.0, green: 0.0, blue: 39.0/255.0, alpha: 1.0)
        }
    }
    
    static var primaryLight: UIColor
    {
        get
        {
            // evaluates to hex 0xbc477bff
            return UIColor(red: 188.0/255.0, green: 71.0/255.0, blue: 123.0/255.0, alpha: 1.0)
        }
    }
    
    static var popoverAlpha: CGFloat
    {
        get
        {
            return 0.7
        }
    }
}
