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
    
    var underlineColor: UIColor?
    {
        didSet
        {
            if let uv = underlineView
            {
                uv.backgroundColor = underlineColor;
            }
        }
    }
    
    required init?(coder aDecoder: NSCoder)
    {
        super.init(coder: aDecoder)
        
        if let xibView = Bundle.main.loadNibNamed("UnderlinedTextField", owner: self, options: nil)?.first as? UIView
        {
            xibView.frame = CGRect(x: 0, y: 0, width: self.frame.size.width, height: self.frame.size.height)
            self.addSubview(xibView)
        }
    }
}
