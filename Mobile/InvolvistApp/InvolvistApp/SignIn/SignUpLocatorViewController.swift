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
    @IBOutlet weak var cityInputView: UnderlinedTextField!
    @IBOutlet weak var stateInputView: UnderlinedTextField!
    @IBOutlet weak var zipInputView: UnderlinedTextField!
    @IBOutlet weak var findMyDistrictButton: WireframeButton!
    @IBOutlet weak var notNowButton: UIButton!
    @IBOutlet weak var locationInformationUseButton: UIButton!
    
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
        
        addressInputView.backgroundColor = UIColor.clear
        addressInputView.inputTextField.backgroundColor = UIColor.clear
        addressInputView.inputTextField.font = Fonts.inputFont
        addressInputView.underlineColor = Theme.primaryDark
        addressInputView.hintTextAlignment = .right
        addressInputView.hintText = NSLocalizedString("AddressLabel", comment: "")
        
        cityInputView.backgroundColor = UIColor.clear
        cityInputView.inputTextField.backgroundColor = UIColor.clear
        cityInputView.inputTextField.font = Fonts.inputFont
        cityInputView.underlineColor = Theme.primaryDark
        cityInputView.hintTextAlignment = .right
        cityInputView.hintText = NSLocalizedString("CityLabel", comment: "")
        
        stateInputView.backgroundColor = UIColor.clear
        stateInputView.inputTextField.backgroundColor = UIColor.clear
        stateInputView.inputTextField.font = Fonts.inputFont
        stateInputView.underlineColor = Theme.primaryDark
        stateInputView.hintTextAlignment = .right
        stateInputView.hintText = NSLocalizedString("StateLabel", comment: "")
        
        zipInputView.backgroundColor = UIColor.clear
        zipInputView.inputTextField.backgroundColor = UIColor.clear
        zipInputView.inputTextField.font = Fonts.inputFont
        zipInputView.underlineColor = Theme.primaryDark
        zipInputView.hintTextAlignment = .right
        zipInputView.hintText = NSLocalizedString("ZipLabel", comment: "")
        
        findMyDistrictButton.wireBorderColor = Theme.primaryDark
        findMyDistrictButton.setTitle(Text.LocalizedString("FindMyDistrictButtonText"), for: UIControlState.normal)
        

        notNowButton.tintColor = Theme.primaryDark;
        notNowButton.setTitle(Text.LocalizedString("NotNowButtonText"), for: UIControlState.normal)
        
        locationInformationUseButton.tintColor = Theme.primaryDark;
    }
}
