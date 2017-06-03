//
//  SignUpLocatorViewController.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 6/2/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation
import UIKit

class SignUpLocatorViewController: UIViewController
{
    @IBOutlet weak var locatorMessageLabel: UILabel!
    
    weak var newUser: User?
    weak var signUpDelegate: SignUpProgressDelegate?
    
    // MARK: Factory
    
    static func create() -> SignUpLocatorViewController
    {
        let sb = UIStoryboard(name: "SignIn", bundle: nil)
        let vc = sb.instantiateViewController(withIdentifier: "SignUpLocatorViewController") as! SignUpLocatorViewController
        return vc
    }
    
    override func viewDidLoad()
    {
        super.viewDidLoad()
        setContentAndStyle()
    }
    
    fileprivate func setContentAndStyle()
    {
        var welcomeMessage = NSLocalizedString("WelcomeMessage", comment: "")
        
        if let user = newUser
        {
            welcomeMessage += ", \(user.firstName)"
        }
        
        locatorMessageLabel.text = welcomeMessage
    }
}
