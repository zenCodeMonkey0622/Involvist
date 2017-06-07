//
//  Theme.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/2/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation
import UIKit

enum ThemeId
{
    // https://material.io/color/#!/?view.left=0&view.right=1&primary.color=870736&secondary.color=CFD8DC
    case Cherrytastic
    // http://paletton.com/#uid=13p0u0kpamd5-yXg5t5zvfgUz8I
    case Bluesideout
}

struct Theme
{
    fileprivate static var currentTheme: ThemeId = .Cherrytastic
    
    fileprivate static var primaries: [ThemeId: UIColor] = {
        return Theme.themePrimaries()
    }()
    
    fileprivate static var primaryDarks: [ThemeId: UIColor] = {
        return Theme.themePrimaryDarks()
    }()
    
    fileprivate static var primaryLights: [ThemeId: UIColor] = {
        return Theme.themePrimaryLights()
    }()
    
    static var primary: UIColor
    {
        get { return primaries[currentTheme]! }
    }
    
    static var primaryDark: UIColor
    {
        get { return primaryDarks[currentTheme]! }
    }
    
    static var primaryLight: UIColor
    {
        get { return primaryLights[currentTheme]! }
    }
    
    static var popoverAlpha: CGFloat
    {
        get { return 0.7 }
    }
    
    static func setTheme(theme: ThemeId)
    {
        currentTheme = theme
    }
    
    fileprivate static func themePrimaries() -> [ThemeId: UIColor]
    {
        return [.Cherrytastic: UIColor(red:135.0/255.0, green: 7.0/255.0, blue: 54.0/255.0, alpha: 1.0),
                .Bluesideout: UIColor(red: 27.0/255.0, green: 90.0/255.0, blue: 111.0/255.0, alpha: 1.0)]
    }
    
    fileprivate static func themePrimaryDarks() -> [ThemeId: UIColor]
    {
        return [.Cherrytastic: UIColor(red: 84.0/255.0, green: 0.0, blue: 16.0/255.0, alpha: 1.0),
                .Bluesideout: UIColor(red: 0.0/255.0, green: 34.0/255.0, blue: 43.0/255.0, alpha: 1.0)]
    }
    
    fileprivate static func themePrimaryLights() -> [ThemeId: UIColor]
    {
        return [.Cherrytastic: UIColor(red: 188.0/255.0, green: 67.0/255.0, blue: 95.0/255.0, alpha: 1.0),
                .Bluesideout: UIColor(red: 140.0/255.0, green: 161.0/255.0, blue: 168.0/255.0, alpha: 1.0)]
    }
}
