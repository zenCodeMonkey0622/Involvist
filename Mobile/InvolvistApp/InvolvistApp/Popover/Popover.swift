//
//  Popover.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/28/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation
import UIKit

class Popover
{
    static func show(popOver: PopoverView?, onViewController viewController: UIViewController?)
    {
        guard let po = popOver, let vc = viewController else
        {
            return
        }
        
        po.translatesAutoresizingMaskIntoConstraints = false
        vc.view.addSubview(po);
        
        // manually set the constraints
        NSLayoutConstraint(item: po, attribute: .leading, relatedBy: .equal, toItem: vc.view, attribute: .centerX, multiplier: 0.3, constant: 0.0).isActive = true
        NSLayoutConstraint(item: po, attribute: .trailing, relatedBy: .equal, toItem: vc.view, attribute: .centerX, multiplier: 1.7, constant: 0.0).isActive = true
        NSLayoutConstraint(item: po, attribute: .top, relatedBy: .equal, toItem: vc.view, attribute: .centerY, multiplier: 0.6, constant: 0.0).isActive = true
        NSLayoutConstraint(item: po, attribute: .bottom, relatedBy: .equal, toItem: vc.view, attribute: .centerY, multiplier: 1.4, constant: 0.0).isActive = true
        
        vc.view.setNeedsUpdateConstraints()
        vc.view.setNeedsLayout()
    }
}
