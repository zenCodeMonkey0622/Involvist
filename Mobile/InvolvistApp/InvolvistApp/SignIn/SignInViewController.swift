//
//  SignInViewController.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/5/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation
import UIKit

class SignInViewController: UIViewController
{
    // outlets
    @IBOutlet weak var containerScrollView: UIScrollView!
    @IBOutlet weak var userNameInput: UnderlinedTextField!
    @IBOutlet weak var passwordInput: UnderlinedTextField!
    @IBOutlet weak var logInButton: WireframeButton!
    @IBOutlet weak var signUpButton: WireframeButton!
    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!
    @IBOutlet weak var orLabel: UILabel!
    
    @IBOutlet weak var logoOuterImage: UIImageView!
    @IBOutlet weak var logoInnerImage: UIImageView!
    @IBOutlet weak var logoRImage: UIImageView!
    
    // properties
    var authProvider: AuthServiceDelegate?
    var navDelegate: LocalNavigationDelegate?
    
    // private members
    fileprivate var userViewModel: User?
    
    override func viewDidLoad()
    {
        super.viewDidLoad()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        setContentAndStyle()
    }
    override func viewDidLayoutSubviews()
    {
        super.viewDidLayoutSubviews()
        
        // this is needed b/c without it we get a top content inset created 
        // for the container scroll view.
        // http://stackoverflow.com/questions/20101572/ios7-uirefreshcontrol-changes-contentinset
        self.containerScrollView.contentInset = UIEdgeInsets.zero
    }
    
    fileprivate func setContentAndStyle()
    {
        self.view.backgroundColor = Theme.primary
        self.logoOuterImage.tintColor = Theme.primaryDark
        self.logoInnerImage.tintColor = Theme.primaryLight
        self.logoRImage.tintColor = Theme.primaryLight
        
        self.userNameInput.backgroundColor = UIColor.clear
        self.userNameInput.inputTextField.backgroundColor = UIColor.clear
        self.userNameInput.inputFont = Fonts.inputFont
        self.userNameInput.underlineColor = Theme.primaryDark
        self.userNameInput.hintTextAlignment = .right
        self.userNameInput.hintText = NSLocalizedString("UserNameLabel", comment: "")
        self.userNameInput.returnKeyType = UIReturnKeyType.done
        
        self.passwordInput.inputTextField.isSecureTextEntry = true
        self.passwordInput.backgroundColor = UIColor.clear
        self.passwordInput.inputTextField.backgroundColor = UIColor.clear
        self.passwordInput.inputFont = Fonts.inputFont
        self.passwordInput.underlineColor = Theme.primaryDark
        self.passwordInput.hintTextAlignment = .right
        self.passwordInput.hintText = NSLocalizedString("PasswordLabel", comment: "")
        self.passwordInput.returnKeyType = UIReturnKeyType.done
        
        self.logInButton.wireBorderColor = Theme.primaryDark
        self.signUpButton.wireBorderColor = Theme.primaryDark
        self.orLabel.textColor = Theme.primaryDark
        self.orLabel.text = NSLocalizedString("OrText", comment: "")
        
        self.navigationController?.setNavigationBarHidden(true, animated: false)
        self.activityIndicator.isHidden = true
    }
    
    // ibactions
    @IBAction func onSignupTapped(_ sender: Any)
    {
        navDelegate?.navigateTo(destinationView: .signUpView)
    }
    
    @IBAction func onLoginTapped(_ sender: Any)
    {
        guard let loginName = self.userNameInput.inputTextField.text, let password = self.passwordInput.inputTextField.text else
        {
            return
        }
        
        /*
        let user = User(loginName: loginName, clearTextPassword: password)
        self.authProvider?.authenticate(user: user, success: onLoginSuccess, fail: onLoginFail)
        */
    }
    
    func onLoginSuccess()
    {
        
    }
    
    func onLoginFail()
    {
        
    }
}
