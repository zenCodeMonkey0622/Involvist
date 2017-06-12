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
    @IBOutlet weak var welcomeMessageLabel: UILabel!
    @IBOutlet weak var addressInputView: UnderlinedTextField!
    @IBOutlet weak var addressInputLabel: UILabel!
    @IBOutlet weak var cityInputView: UnderlinedTextField!
    @IBOutlet weak var cityInputLabel: UILabel!
    @IBOutlet weak var stateInputView: UnderlinedTextField!
    @IBOutlet weak var stateInputLabel: UILabel!
    @IBOutlet weak var zipInputView: UnderlinedTextField!
    @IBOutlet weak var zipInputLabel: UILabel!
    
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
        self.view.backgroundColor = Theme.primary
        
        var welcomeMessage = NSLocalizedString("WelcomeMessage", comment: "")
        
        if let user = newUser
        {
            welcomeMessage += ", \(user.firstName)"
        }
        
        welcomeMessageLabel.text = welcomeMessage
        locatorMessageLabel.text = NSLocalizedString("LocateMessage", comment: "")
        
        addressInputView.inputTextField.backgroundColor = UIColor.clear
        addressInputView.inputTextField.font = Fonts.inputFont
        addressInputView.underlineColor = UIColor.white
        addressInputLabel.text = NSLocalizedString("AddressLabel", comment: "")
        
        cityInputView.inputTextField.backgroundColor = UIColor.clear
        cityInputView.inputTextField.font = Fonts.inputFont
        cityInputView.underlineColor = UIColor.white
        cityInputLabel.text = NSLocalizedString("CityLabel", comment: "")
        
        stateInputView.inputTextField.backgroundColor = UIColor.clear
        stateInputView.inputTextField.font = Fonts.inputFont
        stateInputView.underlineColor = UIColor.white
        stateInputLabel.text = NSLocalizedString("StateLabel", comment: "")
        
        zipInputView.inputTextField.backgroundColor = UIColor.clear
        zipInputView.inputTextField.font = Fonts.inputFont
        zipInputView.underlineColor = UIColor.white
        zipInputLabel.text = NSLocalizedString("ZipLabel", comment: "")
    }
}
