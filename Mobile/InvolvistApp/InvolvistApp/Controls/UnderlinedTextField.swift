//
//  UnderlinedTextField.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/5/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation
import UIKit

class UnderlinedTextField: UIView
{
    @IBOutlet weak var inputTextField: UITextField!
    @IBOutlet weak var underlineView: UIView!
    @IBOutlet weak var hintTextLabel: UILabel!
    
    var text: String?
    {
        get
        {
            return inputTextField.text
        }
    }
    
    var hintText: String?
    {
        didSet
        {
            hintTextLabel.text = hintText
        }
    }
    
    var inputFont: UIFont?
    {
        didSet
        {
            inputTextField.font = inputFont
            hintTextLabel.font = inputFont
        }
    }
    var hintTextAlignment: NSTextAlignment?
    {
        didSet
        {
            if let alignment = hintTextAlignment
            {
                alignHintText(alignment: alignment)
            }
            else
            {
                // default
                alignHintText(alignment: .left)
            }
        }
    }
    
    var underlineColor: UIColor?
    {
        didSet
        {
            underlineView.backgroundColor = underlineColor
            inputTextField.tintColor = underlineColor
            hintTextLabel.textColor = underlineColor
        }
    }
    
    var returnKeyType: UIReturnKeyType?
    {
        didSet
        {
            inputTextField.returnKeyType = self.returnKeyType!
        }
    }
    
    weak var delegate: UITextFieldDelegate?
    {
        didSet
        {
            inputTextField.delegate = delegate
        }
    }
    
    // needed to be able to incude and load this control in other xibs
    required init?(coder aDecoder: NSCoder)
    {
        super.init(coder: aDecoder)
        
        if let xibView = Bundle.main.loadNibNamed("UnderlinedTextField", owner: self, options: nil)?.first as? UIView
        {
            xibView.frame = CGRect(x: 0, y: 0, width: self.frame.size.width, height: self.frame.size.height)
            self.addSubview(xibView)
        }
    }
    
    fileprivate func alignHintText(alignment: NSTextAlignment)
    {
        var alignmentConstraint: NSLayoutConstraint?
        
        for constraint in self.subviews[0].constraints
        {
            guard let constId = constraint.identifier else
            {
                continue
            }
            
            if (constId == "HintTextHorizontalAlignmentConstraint")
            {
                alignmentConstraint = constraint
                break
            }
        }
        
        if let constraintToRemove = alignmentConstraint
        {
            self.subviews[0].removeConstraint(constraintToRemove)
        }
        
        switch alignment
        {
            case .right:
                NSLayoutConstraint(item: hintTextLabel, attribute: .trailing, relatedBy: .equal, toItem: underlineView, attribute: .trailing, multiplier: 1.0, constant: 0.0).isActive = true
                break;
            default:
                NSLayoutConstraint(item: hintTextLabel, attribute: .leading, relatedBy: .equal, toItem: underlineView, attribute: .leading, multiplier: 1.0, constant: 0.0).isActive = true
                break;
        }
        
        self.setNeedsUpdateConstraints()
        self.setNeedsLayout()
        
    }
}
