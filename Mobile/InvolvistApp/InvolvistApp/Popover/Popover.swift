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
    static var blurView: UIVisualEffectView?
    
    static func show(popOver: PopoverView?, onViewController viewController: UIViewController?)
    {
        guard let po = popOver, let vc = viewController else
        {
            return
        }
        
        // add a blur effect to the view controller's view that will be displaying
        // the popover
        let blurEffect = UIBlurEffect(style: .dark)
        blurView = UIVisualEffectView(effect: blurEffect)
        vc.view.addFillingSubview(subview: blurView)
        
        // add the popover to the target view controller's view
        // stack
        po.translatesAutoresizingMaskIntoConstraints = false
        vc.view.addSubview(po);
        
        // manually set the constraints to fill the parent view
        NSLayoutConstraint(item: po, attribute: .leading, relatedBy: .equal, toItem: vc.view, attribute: .centerX, multiplier: 0.1, constant: 0.0).isActive = true
        NSLayoutConstraint(item: po, attribute: .trailing, relatedBy: .equal, toItem: vc.view, attribute: .centerX, multiplier: 1.9, constant: 0.0).isActive = true
        NSLayoutConstraint(item: po, attribute: .top, relatedBy: .equal, toItem: vc.view, attribute: .centerY, multiplier: 0.6, constant: 0.0).isActive = true
        NSLayoutConstraint(item: po, attribute: .bottom, relatedBy: .equal, toItem: vc.view, attribute: .centerY, multiplier: 1.4, constant: 0.0).isActive = true
        
        vc.view.setNeedsUpdateConstraints()
        vc.view.setNeedsLayout()
    }
    
    static func dismissActivePopover()
    {
        if let _ = blurView
        {
            blurView?.removeFromSuperview()
            blurView = nil
        }
    }
}
