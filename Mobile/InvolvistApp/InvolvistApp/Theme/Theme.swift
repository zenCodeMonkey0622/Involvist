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
    // http://paletton.com/#uid=12m0u0kpAkt6Pv6h7qkzTeJTP7X
    case Jadee
    // http://paletton.com/#uid=10X0u0kvHxicUCNmkvODApXNhkD
    case Creemsik
    // http://paletton.com/#uid=14N0u0kthoz6uE6kftFEnhbWk8Y
    case Porpyl
    // http://paletton.com/#uid=13i0u0kwjswkYLXqSBnxXkgIy9p
    case Pepaglint
    // http://paletton.com/#uid=13n0u0k++l0++00+UaR+uuMuFMO
    case Bolombo
    
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
                .Bluesideout: UIColor(red: 27.0/255.0, green: 90.0/255.0, blue: 111.0/255.0, alpha: 1.0),
                .Jadee: UIColor(red: 112.0/255.0, green: 152.0/255.0, blue: 31.0/255.0, alpha: 1.0),
                .Creemsik: UIColor(red: 255.0/255.0, green: 171.0/255.0, blue: 2.0/255.0, alpha: 1.0),
                .Porpyl: UIColor(red: 130.0/255.0, green: 11.0/255.0, blue: 125.0/255.0, alpha: 1.0),
                .Pepaglint: UIColor(red: 0.0/255.0, green: 136.0/255.0, blue: 136.0/255.0, alpha: 1.0),
                .Bolombo: UIColor(red: 0.0/255.0, green: 123.0/255.0, blue: 152.0/255.0, alpha: 1.0)]
    }
    
    fileprivate static func themePrimaryDarks() -> [ThemeId: UIColor]
    {
        return [.Cherrytastic: UIColor(red: 84.0/255.0, green: 0.0, blue: 16.0/255.0, alpha: 1.0),
                .Bluesideout: UIColor(red: 0.0/255.0, green: 34.0/255.0, blue: 43.0/255.0, alpha: 1.0),
                .Jadee: UIColor(red: 73.0/255.0, green: 109.0/255.0, blue: 0.0/255.0, alpha: 1.0),
                .Creemsik: UIColor(red: 207.0/255.0, green: 138.0/255.0, blue: 0.0/255.0, alpha: 1.0),
                .Porpyl: UIColor(red: 47.0/255.0, green: 0.0/255.0, blue: 45.0/255.0, alpha: 1.0),
                .Pepaglint: UIColor(red: 0.0/255.0, green: 45.0/255.0, blue: 45.0/255.0, alpha: 1.0),
                .Bolombo: UIColor(red: 0.0/255.0, green: 44.0/255.0, blue: 54.0/255.0, alpha: 1.0)]
    }
    
    fileprivate static func themePrimaryLights() -> [ThemeId: UIColor]
    {
        return [.Cherrytastic: UIColor(red: 188.0/255.0, green: 67.0/255.0, blue: 95.0/255.0, alpha: 1.0),
                .Bluesideout: UIColor(red: 140.0/255.0, green: 161.0/255.0, blue: 168.0/255.0, alpha: 1.0),
                .Jadee: UIColor(red: 215.0/255.0, green: 231.0/255.0, blue: 182.0/255.0, alpha: 1.0),
                .Creemsik: UIColor(red: 255.0/255.0, green: 221.0/255.0, blue: 152.0/255.0, alpha: 1.0),
                .Porpyl: UIColor(red: 194.0/255.0, green: 155.0/255.0, blue: 192.0/255.0, alpha: 1.0),
                .Pepaglint: UIColor(red: 71.0/255.0, green: 207.0/255.0, blue: 207.0/255.0, alpha: 1.0),
                .Bolombo: UIColor(red: 15.0/255.0, green: 175.0/255.0, blue: 212.0/255.0, alpha: 1.0)]
    }
}
