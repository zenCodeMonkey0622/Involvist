//
//  UIView+Extensions.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/29/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation
import UIKit

extension UIView
{
    func addFillingSubview(subview: UIView?, forceLayout: Bool = false)
    {
        guard let sv = subview else
        {
            return
        }
        
        sv.translatesAutoresizingMaskIntoConstraints = false
        self.addSubview(sv)
        
        NSLayoutConstraint(item: sv, attribute: .leading, relatedBy: .equal, toItem: self, attribute: .leading, multiplier: 1.0, constant: 0.0).isActive = true
        NSLayoutConstraint(item: sv, attribute: .trailing, relatedBy: .equal, toItem: self, attribute: .trailing, multiplier: 1.0, constant: 0.0).isActive = true
        NSLayoutConstraint(item: sv, attribute: .top, relatedBy: .equal, toItem: self, attribute: .top, multiplier: 1.0, constant: 0.0).isActive = true
        NSLayoutConstraint(item: sv, attribute: .bottom, relatedBy: .equal, toItem: self, attribute: .bottom, multiplier: 1.0, constant: 0.0).isActive = true
        
        if (forceLayout)
        {
            self.setNeedsUpdateConstraints()
            self.setNeedsLayout()
        }
    }
}
