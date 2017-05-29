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
    
    convenience init?(description: String?, onDismiss: (() -> ())?)
    {
        self.init(frame: .zero)
        
        guard let topView = Bundle.main.loadNibNamed("PopoverView", owner: self, options: nil)?[0] as? UIView else
        {
            return nil
        }
        
        self.addSubview(topView)
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
    }
}
