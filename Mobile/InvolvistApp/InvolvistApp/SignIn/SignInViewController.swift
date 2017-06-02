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
    @IBOutlet weak var userNameLabel: UILabel!
    @IBOutlet weak var passwordLabel: UILabel!
    @IBOutlet weak var orLabel: UILabel!
    
    // properties
    var authProvider: AuthServiceDelegate?
    var navDelegate: LocalNavigationDelegate?
    
    // private members
    fileprivate var userViewModel: User?
    
    override func viewDidLoad()
    {
        super.viewDidLoad()
        self.view.backgroundColor = Theme.involvistPrimary
        
        self.userNameInput.inputTextField.backgroundColor = UIColor.clear
        self.userNameInput.underlineColor = Theme.involvistDark
        self.userNameInput.returnKeyType = UIReturnKeyType.done
        self.userNameLabel.textColor = Theme.involvistLight
        self.userNameLabel.text = NSLocalizedString("UserNameLabel", comment: "")
        
        self.passwordInput.inputTextField.isSecureTextEntry = true
        self.passwordInput.inputTextField.backgroundColor = UIColor.clear
        self.passwordInput.underlineColor = Theme.involvistDark
        self.passwordInput.returnKeyType = UIReturnKeyType.done
        self.passwordLabel.textColor = Theme.involvistLight
        self.passwordLabel.text = NSLocalizedString("PasswordLabel", comment: "")
        
        self.logInButton.wireBorderColor = UIColor.white
        
        self.orLabel.textColor = Theme.involvistLight
        self.orLabel.text = NSLocalizedString("OrText", comment: "")
        
        self.signUpButton.wireBorderColor = UIColor.white
        
        self.navigationController?.setNavigationBarHidden(true, animated: false)
        self.activityIndicator.isHidden = true
    }
    
    override func viewDidLayoutSubviews()
    {
        super.viewDidLayoutSubviews()
        
        // this is needed b/c without it we get a top content inset created 
        // for the container scroll view.
        // http://stackoverflow.com/questions/20101572/ios7-uirefreshcontrol-changes-contentinset
        self.containerScrollView.contentInset = UIEdgeInsets.zero
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
