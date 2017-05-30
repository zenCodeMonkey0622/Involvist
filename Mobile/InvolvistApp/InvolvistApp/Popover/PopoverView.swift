//
//  PopoverView.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/28/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation
import UIKit

class PopoverView: UIView
{
    @IBOutlet weak var descriptionLabel: UILabel!
    
    var onDismiss: (() -> ())?
    
    // conveniance initializer that takes in a description message
    // as well as an onDismiss closure. this initializer calls
    // the designated initializer init(frame:).
    // this initializer is failable
    convenience init?(description: String?, onDismiss: (() -> ())?)
    {
        self.init(frame: .zero)
        
        // load the xib objects from the xib, get the first element which should
        // be the root view
        guard let topView = Bundle.main.loadNibNamed("PopoverView", owner: self, options: nil)?[0] as? UIView else
        {
            return nil
        }
        
        topView.translatesAutoresizingMaskIntoConstraints = false
        self.addSubview(topView)
        
        // manually set the constraints
        NSLayoutConstraint(item: topView, attribute: .leading, relatedBy: .equal, toItem: self, attribute: .leading, multiplier: 1.0, constant: 0.0).isActive = true
        NSLayoutConstraint(item: topView, attribute: .trailing, relatedBy: .equal, toItem: self, attribute: .trailing, multiplier: 1.0, constant: 0.0).isActive = true
        NSLayoutConstraint(item: topView, attribute: .top, relatedBy: .equal, toItem: self, attribute: .top, multiplier: 1.0, constant: 0.0).isActive = true
        NSLayoutConstraint(item: topView, attribute: .bottom, relatedBy: .equal, toItem: self, attribute: .bottom, multiplier: 1.0, constant: 0.0).isActive = true
        
        self.descriptionLabel.text = description
        self.onDismiss = onDismiss
    }
    
    override func awakeFromNib()
    {
        super.awakeFromNib()
    }
    
    @IBAction func onDismissTapped(_ sender: Any)
    {
        if let dismissAction = onDismiss
        {
            dismissAction()
        }
        
        self.removeFromSuperview()
    }
}
